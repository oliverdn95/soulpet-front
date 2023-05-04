import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState("")
    const [show, setShow] = useState(false);
    const [showDetalhes, setShowDetalhes] = useState(false);
    const [idProduto, setIdProduto] = useState(null);
    const [filterCliente, setFilterCliente] = useState("");
    const [filterProduto, setFilterProduto] = useState("");

    const handleClose = () => {
        setIdProduto(null);
        setShow(false);
    };
    const handleShow = (id) => {
        setIdProduto(id);
        setShow(true);
    };

    const handleCloseDetalhes = () => {
        setIdProduto(null);
        setSelectedPedido("");
        setShowDetalhes(false);
    };
    const handleShowDetalhes = (pedido) => {
        setIdProduto(pedido.produto.id);
        setSelectedPedido(pedido.codigo);
        setShowDetalhes(true);
    };

    
    function onDelete() {
        
    }

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios
            .get("http://localhost:3001/pedidos")
            .then((response) => {
                console.log(response.data);
                // Classifica a lista de pedidos por nome e categoria
                response.data.sort(
                    (a, b) =>
                        a.cliente.nome.localeCompare(b.cliente.nome) ||
                        a.produto.nome.localeCompare(b.produto.nome)
                );
                setPedidos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    function resetarPesquisa() {
        setFilterCliente("");
        setFilterProduto("");
    }

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Pedidos</h1>
                <Button variant="success" as={Link} to="/pedidos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Pedidos
                </Button>
            </div>
            <div className="">
                <div className="row mb-3 d-flex align-items-center">
                    <div className="col-md-4">
                        <label htmlFor="filterProduto" className="form-label">
                            Nome do Produto:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="filterProduto"
                            value={filterProduto}
                            onChange={(e) => setFilterProduto(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="filterCliente" className="form-label">
                            Nome do Cliente:
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="filterCliente"
                            value={filterCliente}
                            onChange={(e) => setFilterCliente(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2 align-self-end">
                        <label htmlFor="filterBtn" className="form-label"></label>
                        <Button variant="secondary" style={{color: "black"}} onClick={resetarPesquisa}>Resetar pesquisa</Button>
                    </div>
                </div>
            </div>
            {pedidos === null ? (
                <Loader />
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Pedido</th>
                            <th>Nome do Produto</th>
                            <th>Data da Compra (YYYY-MM-DD)</th>
                            <th>Cliente Comprador</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos
                            .filter(
                                (pedido) =>
                                    pedido.produto.nome
                                        .toLowerCase()
                                        .includes(filterProduto.toLowerCase()) &&
                                    pedido.cliente.nome
                                        .toLowerCase()
                                        .includes(filterCliente.toLowerCase())
                            )
                            .map((pedido, i) => {
                                let dataPedido = pedido.createdAt.slice(0, 10);
                                return (
                                    <tr key={pedido.codigo}>
                                        <td>{i + 1}</td>
                                        <td>{pedido.produto.nome}</td>
                                        <td>{dataPedido}</td>
                                        <td>{pedido.cliente.nome}</td>
                                        <td className="d-flex gap-2">
                                            <Button variant="warning" style={{color: "black"}} onClick={() => handleShowDetalhes(pedido)}>
                                                <i class="bi bi-card-list"></i>
                                            </Button>
                                            <Button variant="warning" style={{color: "black"}} as={Link} to={`/pedidos/editar/${pedido.codigo}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="danger" style={{color: "black"}} onClick={() => handleShow(pedido.codigo)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            )}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o pedido?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* Modal de detalhes do pedido */}
            <Modal show={showDetalhes} onHide={handleCloseDetalhes}>
                <Modal.Header closeButton>
                    <Modal.Title>Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        <p>Preço: {pedidos.find(pedido => pedido.codigo === selectedPedido)?.produto.preco}</p>
                        <p>Quantidade: {pedidos.find(pedido => pedido.codigo === selectedPedido)?.quantidade}</p>
                        <p>Desconto: {pedidos.find(pedido => pedido.codigo === selectedPedido)?.produto.desconto}%</p>
                        <p>Total: R${(pedidos.find(pedido => pedido.codigo === selectedPedido)?.produto.preco - 
                        (pedidos.find(pedido => pedido.codigo === selectedPedido)?.produto.preco * pedidos.find(pedido => pedido.codigo === selectedPedido)?.produto.desconto) / 100) 
                        * pedidos.find(pedido => pedido.codigo === selectedPedido)?.quantidade}</p>
                        {/* Formula: (pedido.produto.preco - (pedido.produto.preco * pedido.produto.desconto) / 100) * pedido.quantidade; */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseDetalhes}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
