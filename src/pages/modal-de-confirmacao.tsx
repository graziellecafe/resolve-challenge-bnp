/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';
import Head from 'next/head';

import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const modalContent = () => (
		<div data-modal-content className={styles["container"]}>
			<p>Você tem certeza que deseja criar o usuário?</p>
	  	</div>
	)

	const modalContent2 = () => (
		<div data-modal-content className={styles["container"]}>
			<p>Teste para modal dinâmico</p>
	  	</div>
	)

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
			footer={{ confirmText: 'Criar usuário', cancelText: 'Cancelado'}}
		  >
			{modalContent()}
		  </Modal>
		</>
	  );
	}
