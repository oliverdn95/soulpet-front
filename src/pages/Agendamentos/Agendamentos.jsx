import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Agendamentos() {

    const [agendamentos, setAgendamentos] = useState(null);
    const [show, setShow] = useState(false);
    const [idAgendamento, setIdAgendamentos] = useState(null);

    //[FE-16] Integrar a remoção de Agendamentos#16
    const handleClose = () => {
        setIdAgendamentos(null);
        setShow(false)
    };
    const handleShow = (id) => {
        setIdAgendamentos(id);
        setShow(true)
    };

    useEffect(() => {
        initializeTable();
    }, []);

    function initializeTable() {
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    function onDelete() {
        axios.delete(`http://localhost:3001/agendamentos/${idAgendamento}`)
            .then(response => {
                toast.success(response.data.message, { position: "bottom-right", duration: 2000 });
                initializeTable();
            })
            .catch(error => {
                console.log(error);
                toast.error(error.response.data.message, { position: "bottom-right", duration: 2000 });
            });
        handleClose();
    }

    return (
        <div className="agendamentos container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Agendamentos</h1>
                <Button variant="success" as={Link} to="/agendamentos/novo">
                    <i className="bi bi-plus-lg me-2"></i> Novo Agendamento
                </Button>
            </div>
            {
                agendamentos === null ?
                    <Loader />
                    :
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Data Agendada</th>
                                <th>Data Realizada</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamentos.map(agendamento => {
                                return (
                                    <tr key={agendamento.id}>
                                        <td>{agendamento.dataAgendada}</td>
                                        <td>{agendamento.realizada? 'Concluído' : 'Pendente'}</td>
                                        <td className="d-flex gap-2">
                                            <Button variant="danger" onClick={() => handleShow(agendamento.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </Button>
                                            <Button variant="primary" as={Link} to={`/agendamentos/editar/${agendamento.id}`}>
                                                <i className="bi bi-pencil-fill"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmação</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir o agendamento?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
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