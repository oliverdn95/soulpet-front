import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Pets() {

    const [pets, setPets] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const [showDelete, setShowDelete ] = useState(false)
    const [selectedPet, setSelectedPet] = useState(null);
    const [idPet, setIdPet] = useState(null)

    const handleCloseDetails = () => {
        setSelectedPet(null);
        setShowDetails(false)
    };
    const handleShowDetails = (pet) => {
        setSelectedPet(pet);
        setShowDetails(true)
    };

    //para deletar pet especifico
    const handleCloseDelete = () => {
        setIdPet(null)
        setShowDelete(false)
    };
    const handleShowDelete = (id) => {
        setIdPet(id)
        setShowDelete(true)
    };


    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
                //setIdPet(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }

    //função para remover um pet especifico(id)
    function onDelete() {
        axios.delete(`http://localhost:3001/pets/${idPet}`)
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
                <h1>Pets</h1>
                <Button as={Link} to="/pets/novo">
                    <i className="bi bi-plus-lg me-2"></i> Pet
                </Button>
            </div>
            {
                pets === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pets.map(pet => {
                                return (
                                    <tr key={pet.id}>
                                        <td>{pet.nome}</td>
                                        
                                        <td className="d-flex gap-2">
                                            <Button onClick={() => handleShowDelete(pet.id)}><i className="bi bi-trash-fill"></i></Button>
                                            <Button as={Link} to={`/pets/editar/${pet.id}`}><i className="bi bi-pencil-fill"></i></Button>
                                            <Button onClick={() => handleShowDetails(pet)}><i class="bi bi-info-square"></i></Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            {/* Modal de detalhes do Pet */}
            <Modal show={showDetails} onHide={handleCloseDetails}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedPet?.nome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Tipo: {selectedPet?.tipo}</p>
                    <p>Porte: {selectedPet?.porte}</p>
                    <p>Data de Nascimento: {selectedPet?.dataNasc}</p></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseDetails}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>git 
            {/* Modal de confirmação de exclusão do pet */}
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