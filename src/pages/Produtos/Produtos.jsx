import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";

export function Produtos() {

    const [produtos, setProdutos] = useState(null);
    const [show, setShow] = useState(false);
    const [idProduto, setIdProduto] = useState(null);
    const [filterName, setFilterName] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    const handleClose = () => {
        setIdProduto(null);
        setShow(false);
    };
    const handleShow = (id) => {
        setIdProduto(id);
        setShow(true);
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                // Classifica a lista de produtos por nome e categoria
                response.data.sort((a, b) => a.nome.localeCompare(b.nome) || a.categoria.localeCompare(b.categoria));
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function handleFilter() {
        axios.get(`http://localhost:3001/produtos?nome_like=${filterName}&categoria_like=${filterCategory}`)
            .then(response => {
                // Classifica a lista de produtos por nome e categoria
                response.data.sort((a, b) => a.nome.localeCompare(b.nome) || a.categoria.localeCompare(b.categoria));
                console.log(response.data)
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
      <div className="clientes container">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Produtos</h1>
          <Button as={Link} to="/produtos/novo">
            <i className="bi bi-plus-lg me-2"></i> Produto
          </Button>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="filterName" className="form-label">Nome:</label>
            <input type="text" className="form-control" id="filterName" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
          </div>
          <div className="col-md-4">
            <label htmlFor="filterCategory" className="form-label">Categoria:</label>
            <input type="text" className="form-control" id="filterCategory" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} />
          </div>
          <div className="col-md-2">
            <label htmlFor="filterBtn" className="form-label">&nbsp;</label>
           
          </div>
        </div>
        {produtos === null ? (
          <Loader />
        ) : (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Desconto</th>
                <th>Validade do Desconto</th>
                <th>Categoria</th>
              </tr>
            </thead>
            <tbody>
              {produtos
                .filter((produto) =>
                  produto.nome.toLowerCase().includes(filterName.toLowerCase()) &&
                  produto.categoria.toLowerCase().includes(filterCategory.toLowerCase())
                )
                .map((produto) => {
                  return (
                    <tr key={produto.id}>
                      <td>{produto.nome}</td>
                      <td>{produto.descricao}</td>
                      <td>{produto.preco}</td>
                      <td>{produto.desconto}</td>
                      <td>{produto.dataDesconto}</td>
                      <td>{produto.categoria}</td>
                      <td className="d-flex gap-2">
                        <Button onClick={() => handleShow(produto.id)}>
                          <i className="bi bi-trash-fill"></i>
                        </Button>
                        <Button as={Link} to={`/produtos/editar/${produto.id}`}>
                          <i className="bi bi-pencil-fill"></i>
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
          <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary">Excluir</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )}
