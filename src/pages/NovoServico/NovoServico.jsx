import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoServico() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    function onSubmit(data) {
        axios.post("http://localhost:3001/servicos", data)
            .then(response => {
                toast.success("Servico adicionado.", { position: "bottom-right", duration: 2000 });
                navigate("/servicos");
            })
            .catch(error => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    return (
        <div className="container">
            <h1>Adicionar Serviço</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" className={errors.nome && "is-invalid"} {...register("nome", { required: "O nome é obrigatório." })} />
                    {errors.nome && <Form.Text className="invalid-feedback">{errors.nome.message}</Form.Text>}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Preco</Form.Label>
                    <Form.Control type="number" className={errors.preco && "is-invalid"} {...register("preco", { required: "O preco é obrigatório.", min: { value: 1, message: "O valor tem que ser maior que zero"} })} />
                    {errors.preco && <Form.Text className="invalid-feedback">{errors.preco.message}</Form.Text>}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}