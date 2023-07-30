# Challenge - Front End Jr. BNP
Resolução: Grazielle Amanda do Carmo Café 

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