import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";
import fig01  from "../../assets/patinha.svg";
import fig02 from "../../assets/address01.svg";

export function Clientes() {

    const [clientes, setClientes] = useState([]);    
    const [enderecos, setEnderecos] = useState([]);
    const [pets, setPets] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [showPet, setShowPet] = useState(false);
    const [idCliente, setIdCliente] = useState([]);
    const [selectedPet, setSelectedPet] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState([]);
    const [selectedEndereço, setSelectedEndereco] = useState([]);
  
    const handleCloseDelete = () => {
        setIdCliente([]);
        setShowDelete(false)
    };
    const handleShowDelete = (id) => {
        setIdCliente(id);
        setShowDelete(true)
    };

    const handleCloseAddress = () => {
        setSelectedCliente([]);
        setSelectedEndereco([]);
        setShowAddress(false)
    };
    const handleShowAddress = (cliente) => {
        setSelectedCliente(cliente)
        setSelectedEndereco([]);
        setShowAddress(true)
    };

    const handleClosePet = () => {
        setSelectedCliente([]);
        setSelectedPet([]);
        setShowPet(false)
    };
    const handleShowPet = (cliente) => {
        setSelectedCliente(cliente)
        setSelectedPet([]);
        axios.get(`http://localhost:3001/clientes/${cliente.id}/pets`)
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        setShowPet(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/clientes/enderecos")
            .then(response => {
                setEnderecos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/clientes/${idCliente}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleCloseDelete();
    }

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Clientes</h1>
                <Button variant="success" as={Link} to="/clientes/novo">
                    <i className="bi bi-plus-lg me-2"></i> Cliente
                </Button>
            </div>
            {
                clientes === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Telefone</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map(cliente => {
                                return (
                                    <tr key={cliente.id}>
                                        <td>{cliente.nome}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.telefone}</td>
                                        <td className="d-flex gap-2">
                                            <Button variant="danger" onClick={() => handleShowDelete(cliente.id)}>
                                                <i style={{color: "black"}} className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button as={Link} to={`/clientes/editar/${cliente.id}`}>
                                                <i style={{color: "black"}} className="bi bi-pencil-fill"></i>
                                            </Button>
                                            <Button variant="warning" onClick={() => handleShowPet(cliente)}><img style={{color: "black"}} src={fig01} alt="fig01"/></Button>
                                            <Button variant="warning" onClick={() => handleShowAddress(cliente)}><img style={{color: "black"}} src={fig02} alt="fig02"/></Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
             {/* Modal de detalhes do Endereço */}
            <Modal show={showAddress} onHide={handleCloseAddress}>
                <Modal.Header closeButton>
                    <Modal.Title>Endereço:</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                <>
                        <p>Rua: {enderecos.find(endereco => endereco.clienteId === selectedCliente.id)?.rua}</p>
                        <p>Número: {enderecos.find(endereco => endereco.clienteId === selectedCliente.id)?.numero}</p>
                        <p>Cidade: {enderecos.find(endereco => endereco.clienteId === selectedCliente.id)?.cidade}</p>
                        <p>Estado: {enderecos.find(endereco => endereco.clienteId === selectedCliente.id)?.uf}</p>
                        <p>CEP: {enderecos.find(endereco => endereco.clienteId === selectedCliente.id)?.cep}</p>
                </>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseAddress}>
                    Fechar
                </Button>
            </Modal.Footer>
            </Modal>

            {/* Modal de detalhes dos Pets */}
            <Modal show={showPet} onHide={handleClosePet}>
                <Modal.Header closeButton>
                    <Modal.Title>Pets:</Modal.Title> 
                </Modal.Header>
                <Modal.Body>
                <>
                        {pets.length === 0 ? <p>Não existe nenhum Pet cadastrado!</p> :
                        <p>Nomes: {pets.filter(pet => pet.clienteId === selectedCliente.id).map(pet =>pet.nome).join(", ")}</p>
        }
                </>
                </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClosePet}>
                    Fechar
                </Button>
            </Modal.Footer>
            </Modal>

            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o cliente?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseDelete}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={onDelete}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}