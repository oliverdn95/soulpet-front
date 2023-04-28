import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoPet() {

    const { register, handleSubmit, formState: { errors, isSubmited } } = useForm();
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);


    function onSubmit(data) {
        console.log(data);
        axios.post("http://localhost:3001/pets", data)
            .then(response => {
                toast.success("Pet adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/pets");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    function listarClientes() {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    useEffect(() => {
        listarClientes();
    }, []);

    return (
        <div className="container">
            <h1>Novo Pet</h1>
            <div>Cliente</div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div className=" form-floating mb-3">
                    <select className={!isSubmited ? "form-select" : (errors.clienteId ? "forms-select is-invalid" : "forms-select is-valid")}
                        id="clienteId" {...register("clienteId", { required: "O cliente é obrigatório." })}>
                        <option value="" desabled>Selecione</option>
                        {clientes.map(cliente => (
                            <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                        ))}
                    </select>
                    <label htmlFor="clienteId"></label>
                    <div className="invalid-feedback">
                        {errors.clienteId && errors.clienteId.message}
                    </div>
                </div>

                <Form.Group className="mb-3">
                    <Form.Label>Nome do Pet</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório.", maxLength: { value: 130, message: "Limite de 20 caracteres." } })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control type="text" className={errors.tipo && "is-invalid"} {...register("tipo", { required: "O tipo é obrigatório.", maxLength: { value: 255, message: "Limite de 20 caracteres." } })} />
                    {errors.tipo && <Form.Text className="invalid-feedback">{errors.tipo.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Porte</Form.Label>
                    <Form.Control type="text" className={errors.porte && "is-invalid"} {...register("porte", { required: "O porte é obrigatório.", maxLength: { value: 255, message: "Limite de 20 caracteres." } })} />
                    {errors.porte && <Form.Text className="invalid-feedback">{errors.porte.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Data de Nascimento</Form.Label>
                    <Form.Control type="date" className={errors.dataNasc && "is-invalid"} {...register("dataNasc", { required: "A data é obrigatória.", maxLength: { value: 255, message: "Limite de 255 caracteres." } })} />
                    {errors.dataNasc && <Form.Text className="invalid-feedback">{errors.dataNasc.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}