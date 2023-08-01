/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

/* O Context API é uma funcionalidade do React que permite o compartilhamento de dados 
entre componentes sem a necessidade de passar explicitamente esses dados através de props 
em cada nível da árvore de componentes. Em Next.js, que é um framework React para renderização 
do lado do servidor (Server-Side Rendering - SSR) e renderização do lado do cliente (Client-Side Rendering - CSR),
 o Context API pode ser utilizado da mesma forma que em projetos React tradicionais. */

 import styles from "@/styles/context-api.module.css";
import { ToastMessage } from "@/components/ToastMessage";
import { useToast } from "@/contexts/toast.context";
import { faker } from "@faker-js/faker";

export default function ContextApi() {
  const { messages, addMessage } = useToast();
  function handleSuccessButtonClick() {
    addMessage({
      id: faker.string.uuid(),
      message: "Mensagem de sucesso",
      type: "success",
    });
  }

  function handleErrorButtonClick() {
    addMessage({
      id: faker.string.uuid(),
      message: "Mensagem de erro",
      type: "error",
    });
  }

  return (
    <>
      <div className={styles.container}>
        <button type="button" onClick={handleSuccessButtonClick}>
          Disparar mensagem de sucesso
        </button>
        <button type="button" onClick={handleErrorButtonClick}>
          Disparar mensagem de erro
        </button>
      </div>

      <div className={styles["toast-container"]}>
        {messages.map((message) => (
          <ToastMessage key={message.id} content={message} />
        ))}
      </div>
    </>
  );
}

