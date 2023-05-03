import axios from "axios";
import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate, useParams} from "react-router-dom";
import { useState } from "react";

export function EditaAgendamento() {
  
  const [pets, setPets] = useState([]);
  const [servicos, setServicos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  function onSubmit(data) {
    axios
      .put(`http://localhost:3001/agendamentos/${id}`, data)
      .then((response) => {
        toast.success("Agendamento editado.", {
          position: "bottom-right",
          duration: 2000,
        });
        navigate("/agendamentos");
      })
      .catch((error) => {
        toast.error("Algo deu errado.", {
          position: "bottom-right",
          duration: 2000,
        });
        console.log(error);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:3001/agendamentos/${id}`).then((response) => {
      const { dataAgendada, realizada, petId, servicoId } =
        response.data;
      reset({ dataAgendada, realizada, petId, servicoId });
    });
  }, [id, reset]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/pets")
      .then((response) => {
        setPets(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:3001/servicos")
      .then((response) => {
        setServicos(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="container">
      <h1>Editar Agendamento</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Data prevista para o serviço</Form.Label>
          <Form.Control
            type="date"
            className={errors.dataAgendada && "is-invalid"}
            {...register("dataAgendada", {
              required: "A data de agendamento é obrigatória.",
              maxLength: { value: 130, message: "Limite de 130 caracteres." },
            })}
          />
          {errors.dataAgendada && (
            <Form.Text className="invalid-feedback">
              {errors.dataAgendada.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            className={errors.realizada && "is-invalid"}
            {...register("realizada", {
              required: "Por favor, defina um status para o agendamento.",
              maxLength: { value: 255, message: "Limite de 255 caracteres." },
            })}
          >
            <option value={false}>Pendente</option>
            <option value={true}>Concluído</option>
          </Form.Control>
          {errors.realizada && (
            <Form.Text className="invalid-feedback">
              {errors.realizada.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pet</Form.Label>
          <Form.Select
            className={errors.petId && "is-invalid"}
            {...register("petId", {
              required: "Por favor, escolha um pet para o agendamento!",
            })}
          >
            {pets.map((pet) => (
              <option key={pet.id} value={pet.id}>
                {pet.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="invalid-feedback">
            {errors.petId?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Serviço</Form.Label>
          <Form.Select
            className={errors.servicoId && "is-invalid"}
            {...register("servicoId", {
              required: "Por favor, defina o serviço para o agendamento!",
            })}
          >
            {servicos.map((servico) => (
              <option key={servico.id} value={servico.id}>
                {servico.nome}
              </option>
            ))}
          </Form.Select>
          <Form.Text className="invalid-feedback">
            {errors.servicoId?.message}
          </Form.Text>
        </Form.Group> 

        <Button variant="primary" type="submit">
         Editar Agendamento
        </Button>
      </Form>
    </div>
  );
}
