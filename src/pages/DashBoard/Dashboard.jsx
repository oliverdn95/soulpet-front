import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Loader } from "../../components/Loader/Loader";

export function Dashboard() {

    const [clientes, setClientes] = useState([]);
    const [pets, setPets] = useState([]);
    const [produtos, setProdutos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [filterCliente, setfilterCliente] = useState("");
    const [selectedClienteId, setSelectedClienteId] = useState(null);

    useEffect(() => {
        initializeTable();
    }, []);

    //Rotas para buscar dados no back-end
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
        axios.get("http://localhost:3001/servicos")
            .then(response => {
                setServicos(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        axios.get("http://localhost:3001/agendamentos")
            .then(response => {
                setAgendamentos(response.data);
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
            {/*Painel do Dashboard*/}
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
                            <td>{servicos.length}</td>
                            <td>{agendamentos.length}</td>
                        </tr>
                        </tbody>
            </Table>
            
            <div className="clientes container">
            <div className="row mb-3">
            <div className="col-md-4">
            <label htmlFor="filterCliente" className="form-label">Cliente:</label>
            <input type="text" className="form-control" id="filterCliente" value={filterCliente} onChange={(e) => {
                setfilterCliente(e.target.value)
                const clienteEncontrado = clientes.find(cliente => cliente.nome.toLowerCase() === e.target.value.toLowerCase())
                if (clienteEncontrado) {
                setSelectedClienteId(clienteEncontrado.id)
            } else {
                setSelectedClienteId(null)
            }
            }} />
            </div>
        </div>
    {clientes === null ? (
        <Loader />
    ) : (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Clientes</th>
                </tr>
            </thead>
            <tbody>
            {clientes
            .filter((cliente) =>
            cliente.nome.toLowerCase().includes(filterCliente.toLowerCase())
            )
            .map((cliente) => {
                return (
                    <tr key={cliente.id}>
                        <td>{cliente.nome}</td>
                    </tr>
                    );
                    })}
            </tbody>
        </Table>
    )}
    {selectedClienteId && (
        <div className="clientes container">
        <h2>Pets do cliente:</h2>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nome:</th>
                    <th>Tipo:</th>
                    <th>Porte:</th>
                </tr>
            </thead>
            <tbody>
            {pets
            .filter((pet) => pet.clienteId === selectedClienteId)
            .map((pet) => {
              return (
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                </tr>
              );
            })}
            </tbody>
        </Table>
    </div>
  )}
  {selectedClienteId && (
    <Button variant="primary" onClick={() => setSelectedClienteId(null)}>Limpar seleção</Button>
  )}
</div>
</div>
)};
