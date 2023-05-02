import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function NovoProduto() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  function onSubmit(data) {
    axios.post("http://localhost:3001/produtos", data).then((response) => {
        toast.success("Produto adicionado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/produtos");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  return (
    <div className="container">
      <h1>Novo Produto</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nome</Form.Label>
          <Form.Control
            type="text"
            className={errors.nome && "is-invalid"}
            {...register("nome", {
              required: "O nome é obrigatório.",
            })}
          />
          {errors.nome && (
            <Form.Text className="invalid-feedback">
              {errors.nome.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descrição</Form.Label>
          <Form.Control
            type="text"
            className={errors.descricao && "is-invalid"}
            {...register("descricao", {
              required: "A descrição é obrigatória.",
              maxLength: { value: 150, message: "Limite de 150 caracteres." },
            })}
          />
          {errors.descricao && (
            <Form.Text className="invalid-feedback">
              {errors.descricao.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Preço</Form.Label>
          <Form.Control
            type="tel"
            className={errors.preco && "is-invalid"}
            {...register("preco", {
              required: "O preço é obrigatório.",
            })}
          />
          {errors.preco && (
            <Form.Text className="invalid-feedback">
              {errors.preco.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Desconto</Form.Label>
          <Form.Control
            type="text"
            className={errors.desconto && "is-invalid"}
            {...register("desconto", {
              required: "O desconto é obrigatório."              
            })}
          />
          {errors.desconto && (
            <Form.Text className="invalid-feedback">
              {errors.desconto.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Validade do Desconto</Form.Label>
          <Form.Control
            type="date"
            className={errors.dataDesconto && "is-invalid"}
            {...register("dataDesconto", {
              required: "A data final de validade do desconto é obrigatória.",
            })}
          />
          {errors.dataDesconto && (
            <Form.Text className="invalid-feedback">
              {errors.dataDesconto.message}
            </Form.Text>
          )}
        </Form.Group>


       <Form.Group className="mb-3">
          <Form.Label>Categoria</Form.Label>
            <Form.Control as="select" className={errors.categoria && "is-invalid"}{...register("categoria", {required: "A categoria é obrigatória."})}>     
            <option value="">Selecione a categoria desejada</option>
            <option value="Higiene">Higiene</option>
            <option value="Brinquedos">Brinquedos</option>
            <option value="Conforto">Conforto</option>
            <option value="Alimentacao">Alimentação</option>
            <option value="Medicamentos">Medicamentos</option>
            </Form.Control>
            {errors.categoria && (
            <Form.Text className="invalid-feedback">
              {errors.categoria.message}
            </Form.Text>
            )}
          </Form.Group>
        <Button variant="primary" type="submit">
          Cadastrar
        </Button>
      </Form>
    </div>
  );
}
