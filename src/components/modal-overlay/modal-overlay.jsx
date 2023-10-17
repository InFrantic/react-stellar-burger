import styles from './modal-overlay.module.css';
import PropTypes from "prop-types";

function ModalOverlay({ onClose }) {
    return (
        <div onClick={onClose} className={styles.overlay}></div>
    )
}

ModalOverlay.propsType = {
    onClick: PropTypes.func.isRequired
}
export default ModalOverlay