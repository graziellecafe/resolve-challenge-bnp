import styles from './style.module.css';

type ModalProps = {
	children: React.ReactNode;
	title: string;
	isOpen: boolean;
	onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
	onConfirm?: () => void;
	footer?: {
		hidden?: boolean;
		confirmText?: string;
		cancelText?: string;
	};
};

export const ModalDeConfirmacao: React.FC<ModalProps> = ({ children, title, isOpen, ...props }) => {
	function handleCloseClick(e: React.MouseEvent) {
		props.onClose?.('click', e.target);
	}

	function handleConfirmClick(e: React.MouseEvent) {
		props.onConfirm?.();
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Escape') props.onClose?.('esc', e.target);
	}

	if (!isOpen) return null;

	return (
		<div data-modal-wrapper className={styles.wrapper} onKeyDown={handleKeyDown}>
			<div data-modal-container>
				<header data-modal-header>
					<h2>{title}</h2>

					<button data-modal-close onClick={handleCloseClick}>
						X
					</button>
				</header>

				{children}

				<div data-modal-body>
        			<p>Você tem certeza que deseja criar o usuário?</p>
      			</div>

				{!props.footer?.hidden && (
					<div data-modal-footer>
						<button data-modal-cancel onClick={handleCloseClick}>
							{props.footer?.cancelText ?? 'Cancelar'}
						</button>

						<button data-modal-confirm onClick={handleConfirmClick} data-type="confirm">
							{props.footer?.confirmText ?? 'Confirmar'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
