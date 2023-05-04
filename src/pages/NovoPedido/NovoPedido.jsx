import axios from "axios";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./NovoPedido.css";

export function NovoPedido() {

    const [clientes, setClientes] = useState([]);
    const [produtos, setProdutos] = useState([]);

    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: "pedidos" });
    const navigate = useNavigate();

    function debug(){
        console.log(errors);
    }

    function onSubmit(data) {
        let { pedidos, clienteId } = data
        pedidos = pedidos.map(ped => {
            return {...ped, clienteId}
        });
        axios.post("http://localhost:3001/pedidos", {pedidos}).then((response) => {
            toast.success("Pedido adicionado.", { position: "bottom-right", duration: 2000 });
            navigate("/pedidos");
        })
            .catch((error) => {
                toast.error("Algo deu errado.", { position: "bottom-right", duration: 2000 });
                console.log(error);
            });
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/clientes")
            .then((response) => {
                setClientes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get("http://localhost:3001/produtos")
            .then((response) => {
                setProdutos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <h1>Novo Pedido</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                    <Form.Label>Cliente</Form.Label>
                    <Form.Select
                        className={errors.clienteId && "is-invalid"}
                        {...register("clienteId", {
                            required: "Por favor, escolha um cliente para registrar o pedido!",
                        })}
                    >
                        <option value="" desabled>Selecione um cliente</option>
                        {clientes.map((cliente) => (
                            <option key={cliente.id} value={cliente.id}>
                                {cliente.nome}
                            </option>
                        ))}
                    </Form.Select>
                    <Form.Text className="invalid-feedback">
                        {errors.clienteId?.message}
                    </Form.Text>
                </Form.Group>

                {fields.map((item, index) => (
                    <div key={item.id} id="campo" className="mb-3">
                        <Form.Group className="fields">
                            <Controller
                                name={`pedidos.${index}.produtoId`}
                                control={control}
                                rules={{ required: { value: true, message: "Por favor, escolha um produto para registrar o pedido!" } }}
                                render={({ field }) => (
                                    <Form.Select className={(errors.pedidos && errors.pedidos[index] && errors.pedidos[index].produtoId) ? "is-invalid fields" : "fields"} {...field}>
                                        <option value="">Selecione um produto</option>
                                        {produtos.map((produto) => (
                                            <option key={produto.id} value={produto.id}>
                                                {produto.nome} 
                                            </option>
                                        ))}
                                    </Form.Select>
                                )}
                            />
                            <Form.Text className="invalid-feedback">
                            {(errors.pedidos && errors.pedidos[index] && errors.pedidos[index].produtoId && errors.pedidos[index].produtoId.message) && errors.pedidos[index].produtoId.message}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="fields">
                            <Controller
                                name={`pedidos.${index}.quantidade`}
                                control={control}
                                rules={{ required: { value: true, message: "Por favor, digite uma quantidade para registrar o pedido!" } }}
                                render={({ field }) => (
                                    <Form.Control
                                        className={(errors.pedidos && errors.pedidos[index] && errors.pedidos[index].quantidade) ? "is-invalid fields" : "fields"}
                                        type="number"
                                        {...field}
                                        placeholder="Digite a quantidade"
                                    />
                                )}
                            />
                            <Form.Text className="invalid-feedback">
                            {(errors.pedidos && errors.pedidos[index] && errors.pedidos[index].quantidade && errors.pedidos[index].quantidade.message) && errors.pedidos[index].quantidade.message}
                            </Form.Text>
                        </Form.Group>

                        <Button id="botao" type="button" onClick={() => remove(index)}>Remover</Button>
                    </div>
                ))}
                <div id="campo">
                    <Button type="button" onClick={() => append({ produtoId: "", quantidade: "" })}>
                        Inserir novo produto
                    </Button>

                    <Button variant="primary" type="submit" onClick={debug}>
                        Finalizar pedido
                    </Button>
                </div>
            </Form>
        </div>
    );
}