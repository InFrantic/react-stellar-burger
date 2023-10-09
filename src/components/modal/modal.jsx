import styles from "./modal.module.css";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useCallback } from "react";
import ModalOverlay from "../modal-overlay/modal-overlay";
import ingredientPropType from '../../utils/prop-types';

const modalRoot = document.getElementById("react-modals");

function Modal(props) {
    const handleCloseModal = useCallback(() => {
        props.onClose(false);
    }, [props.onClose]);

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
                        <h2 className={`${styles.title} text text_type_main-large pb-3 pt-3`}>{props.title}</h2>
                        <div onClick={handleCloseModal} className={styles.close}>
                            <CloseIcon type="primary" className={styles.close} onClick={handleCloseModal}/>
                        </div>
                        {props.children}
                    </div>
                    <ModalOverlay onClose={handleCloseModal}></ModalOverlay>
                </div>
            </>,
        modalRoot
    );
}
Modal.propTypes = ingredientPropType;
export default Modal;