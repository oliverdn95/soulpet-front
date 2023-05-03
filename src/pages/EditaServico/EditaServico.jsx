import axios from "axios"; 
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function EditaServico() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const { id } = useParams();

    function onSubmit(data) {
        axios.put(`http://localhost:3001/servicos/${id}`, data)
            .then(response => {
                toast.success("Serviços editado.", { position: "bottom-right", duration: 2000 });
                navigate("/servicos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/servicos/${id}`)
            .then(response => {
                const { nome, preco } = response.data; 
                reset({ nome, preco });
            });
    }, [id, reset])

    return (
        <div className="container">
            <h1>Editar Serviços</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <Form.Group className="mb-3">
                    <Form.Label>Nome do Serviço</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório." })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control type="number" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preco é obrigatório.", min: { value: 1, message: "O valor tem que ser maior que zero"} })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Editar Serviços
                </Button>
            </Form>
        </div>
    );
}