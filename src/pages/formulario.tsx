/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from "@/styles/formulario.module.css";

import { useForm } from "react-hook-form";
import { IUserCreate } from "@/types/user";
import { toast } from "react-toastify";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>();

  async function onSubmit(data: IUserCreate) {
    try {
      const response = await fetch("http://localhost:8080/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      toast.success("Usuário criado com sucesso!");
    } catch (error) {
      toast.error("Houve um erro ao criar o usuário!");
      console.error("Houve um erro ao criar o usuário:", error);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Name"
            style={{ border: errors.name ? "1px solid red" : "none" }}
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p
              style={{
                fontSize: "0.8em",
                color: "red",
              }}
            >
              O nome é obrigatório
            </p>
          )}

          <input
            type="email"
            placeholder="E-mail"
            style={{ border: errors.email ? "1px solid red" : "none" }}
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p
              style={{
                fontSize: "0.8em",
                color: "red",
              }}
            >
              O e-mail é obrigatório
            </p>
          )}

          <button type="submit" data-type="confirm">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
