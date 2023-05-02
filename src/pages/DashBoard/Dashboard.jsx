import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loader } from "../../components/Loader/Loader";
import { toast } from "react-hot-toast";

export function Dashboard() {

    const [clientes, setClientes] = useState([]);
    const [pets, setPets] = useState([]);
    const [produtos, setProdutos] = useState([]);

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
        axios.get("http://localhost:3001/pets")
            .then(response => {
                setPets(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/produtos")
            .then(response => {
                setProdutos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div className="clientes container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Dashboard</h1>
            </div>
            {
                <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Total de Clientes</th>
                                <th>Total de Pets</th>
                                <th>Total de Produtos</th>
                                <th>Total de Serviços</th>
                                <th>Total de Agendamentos</th>
                            </tr>
                        </thead>
                        <tbody><tr>
                            <td>{clientes.length}</td>
                            <td>{pets.length}</td>
                            <td>{produtos.length}</td>
                        </tr>
                           
                            
                            {/* {clientes.length(clientes => {
                                return (
                                    
                                )
                            })} */}
                        </tbody>
                    </Table>
            }
        </div>
    );
}