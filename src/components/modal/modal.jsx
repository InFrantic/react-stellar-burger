import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";
const modalRoot = document.getElementById("react-modals");

function Modal({onClose, title, children, orderNumber}) {
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
                            <CloseIcon type="primary" className={styles.close} onClick={handleCloseModal}/>
                        </div>
                        {children}
                    </div>
                    <ModalOverlay onClose={handleCloseModal}></ModalOverlay>
                </div>
            </>,
        modalRoot
    );
}
Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string,
  };
export default Modal;