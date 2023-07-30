# Challenge - Front End Jr. BNP
Resolução: Grazielle Amanda do Carmo Café 
## Introdução 
Como primeira vez utilizando o Next.Js, a resolução dos exercícios foi seguindo baseando-se na documentação do framework e do contexto passado para a resolução dos problemas.

Para iniciar o Next.Js é necessário instalá-lo primeiramente 
`npm install next@latest react@latest react-dom@latest`

e para rodar o projeto basta  
`npm run dev` 

os exercícios serão abertos no 
`http://localhost:8080/`

## Exercício 01 - Modal 
**Problema**: O modal fecha ao clicar em qualquer elemento, resolva o problema

**Resolução**: 
- A primeira maneira de pensar foi que o `handleCLoseClick` estava sendo passado para `onClick` no componente `Modal` na div principal, por isso era sempre fechado. Esta era uma maneira simples de resolver o problema, eliminando o `onClick` da div principal. Mas dessa forma não temos ainda o comportamento de um modal que é ser fechado ao clicar fora dele, por isso partimos para outra solução. 
- A segunda opção era alterar o comportamento do `handleCloseClick` em que se a constante criada `isDataModalWrapper` indicasse a posição clicada dentro do modal fosse igual daquela do momento, seria retornado o manter aberto o aberto o modal, enquanto que ao contrário a opção de estar fora do modal e as já criadas de clicar no X, Cancelar e Confirmar fecha o modal. 

```js
	function handleCloseClick(e: React.MouseEvent) {
		const isDataModalWrapper = e.target === e.currentTarget; 
		if(!isDataModalWrapper) return; 
		props.onClose?.('click', e.target);
	}
```

## Exercício 02 - Modal de Confirmação
**Problema**: Criar um modal de confirmação em que o título é `Confirmação` e que o conteúdo seja dinâmico 

**Resolução**: Sabemos que o principal objetivo utilizando React é o reaproveitamento de um componente. Com isso no arquivo `modal-de-confirmacao` foi reutilizado o retorno do componente `Modal`. Para deixar que o conteúdo seja dinâmico foi criado um conteúdo de confirmação `modaContent` e passado no retorno, dando a possibilidade do desenvolvedor alterar apenas esta função quando se passa o `setModalIsOpen(false)` para as props onClose e onConfirm.

```js
	const modalContent = () => (
		<div data-modal-content className={styles["container"]}>
			<p>Você tem certeza que deseja criar o usuário?</p>
	  	</div>
	)
```

```js
return (
		<>
		  <main className={styles.container}>
			<button type="button" onClick={() => setModalIsOpen(true)}>
			  Abrir modal de confirmação
			</button>
		  </main>

		  <Modal
			isOpen={modalIsOpen}
			title="Confirmação"
			onClose={() => setModalIsOpen(false)}
			onConfirm={() => setModalIsOpen(false)}
		  >
			{modalContent()}
		  </Modal>
		</>
	  );
	}
```

## Exercício 03 - Lista 
**Problema**: Implemente uma API em /src/pages/api/users/index.ts e obtenha a lista de usuários. A request deve receber apenas o método GET contendo id, nome e email e utilize a interface IUser para tipar os dados. 

- O primeiro passo foi criar um json com dados que continham as propriedades id, nome e email (arquivo chamado users.json em src/pages/api/users). Ao ir em `http://localhost:8080/api/users` é possível visualizar os dados json como o já passado no arquivo `lista.tsx`. 
- O segundo passo foi o reaproveitar a chamada do `ApiMethod('GET')` criando a constante users tipado como requerido. 
- Para a renderização da lista de usuários criado foi apenas criado um map retornando nome e email. 

```js
    <div data-list-container>
        {users.map((user) => (
             <div key={user.id}>
              {user.name} - {user.email}
            </div>
         ))}
    </div>
```

## Exercício 04 - Formulário
**Problema**: Implemente uma API em /src/pages/api/users/create.ts. Deve ser implementado utilizando a lib react-hook-form. Os campos do formulário devem ser nome e e-mail. Ao dar 'submit', deve ser feito uma request para /api/users/create. 

**Resolução**
- Como feito no exercício anterior, mas agora utilizando o método `POST` foi utilizado o método `ApiMethod` do Next.Js para implementação. É declarado uma função com os parâmetros req e res. É extraido do body do objeto req. O body geralmente envia contém os dados enviados na solicitação de um formulário como neste exercício. 
- Neste caso é atribuido ao tipo `IUSerCreate` que contém uma propriedade id, mas como não queremos atribui-la, utilizamos o `Omit<IUser, "id">` que realiza esta função para nós. 
- Depois, implementamos um push para adicionar a lista de usuários, reaproveitando os dados nome e email e gerando um id aleatório usando a biblioteca externa `faker`. 
- Em resumo, esse código é um handler de API para o método HTTP POST que espera um objeto JSON contendo dados do usuário 
no corpo da solicitação. Quando a rota é acionada, o código adiciona o usuário recebido ao array users, gera um novo id para ele usando faker.number.int(), e retorna o usuário criado como resposta ao cliente
- Dando continuidade a resolução, o componente `formulário` é implementado. Ele permite ao usuário inserir informações como solicitada de nome e email para criar um novo usuário. Como pedido, é importado a biblioteca `useForm` de `react-hook-form`. 
- A função implementada onSubmit é a função de submissão do formulário. Ela é chamada quando o usuário envia o formulário. A função envia os dados do usuário para a rota "/api/users/create" usando o método HTTP POST e a função fetch. 
- Em caso de sucesso, uma mensagem de sucesso é exibida usando uma biblioteca chamada `toast`. Em caso de erro, uma mensagem de erro é exibida e o erro é impresso no console. Veja o exemplo abaixo quaando um usuário é criado: 
<img width="472" alt="usuario_criado" src="https://github.com/graziellecafe/resolve-challenge-bnp/assets/65823579/82f68523-6017-4407-9a3f-a3db46905f4c">

## Exercício 07 - Ciclo de vida de componente
**Problema**:  Ao atualizar o contador, deverá ser passado o valor atualizado no evento onCounterUpdate, e quando o valor
 chegar a 10, o Counter deve ser desmontado.

**Resolução**: 

### Ciclo de vida de componente: Como funciona 
Pesquisa feita antes de se realizar o exercício para o melhor entendimento do solicitado. Em Next.js, o ciclo de vida dos componentes é gerenciado pelo servidor e pelo lado do cliente. 

Aqui está um exemplo de um componente simples em Next Js para entender como o ciclo de vida funciona: 

```js
import { useState, useEffect } from 'react';

const ExampleComponent = () => {
  // Estado local para contar o número de atualizações
  const [count, setCount] = useState(0);

  // useEffect é usado para realizar ações após a renderização do componente
  useEffect(() => {
    console.log('Componente montado.');

    // Função de limpeza para ser executada quando o componente é desmontado
    return () => {
      console.log('Componente desmontado.');
    };
  }, []);

  // Função para manipular o clique do botão
  const handleButtonClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Contagem: {count}</p>
      <button onClick={handleButtonClick}>Incrementar</button>
    </div>
  );
};

export default ExampleComponent;
```

A partir do exemplo, seguimos com a implementação no exercício solicitado. 
- Primeiramente analisamos o componente `Counter` em `components/Counter/index`. Nele está implementado parecido com o exemplo acima encontrado, um contador simples. O primeiro `useEffect` é executado somente após o componente ser montado na fase de montagem. Ele não possui dependências, o que significa que será executado apenas uma vez, assim que o componente é montado.
- O segundo useEffect é executado sempre que o estado count é atualizado (ou seja, quando o contador é incrementado). Ele possui count como dependência, o que significa que será acionado sempre que count mudar. 
- É implementado uma condição de forma que o segundo useEffect, como solicitado, será desmontado quando o contador for igual `=== 10`. 
- Em resumo, o componente Counter é um contador simples que mantém o estado count para controlar o valor do contador. Ele emite eventos personalizados em diferentes estágios do ciclo de vida do componente - "onCounterMount" quando o componente é montado, "onCounterUnmount" quando é desmontado e "onCounterUpdate" quando o valor do contador chega a 10.


