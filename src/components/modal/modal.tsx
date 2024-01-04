import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";

function Modal({ onClose, title, children }) {
    const handleCloseModal = useCallback(() => {
        onClose(false);
    }, [onClose]);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                handleCloseModal();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, [handleCloseModal]);

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal}>
                <div className={styles.content}>
                    <h2 className={`${styles.title} text text_type_main-large pb-3 pt-3`}>{title}</h2>
                    <div onClick={handleCloseModal} className={styles.close}>
                        <CloseIcon type="primary" />
                    </div>
                    {children}
                </div>
                <ModalOverlay onClose={handleCloseModal}></ModalOverlay>
            </div>
        </>,
        document.getElementById("modal") as HTMLElement
    );
}

export default Modal;