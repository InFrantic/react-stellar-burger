import { TPropsModalOverlay } from '../../utils/types';
import styles from './modal-overlay.module.css';

function ModalOverlay({ onClose }: TPropsModalOverlay) {
    return (
        <div onClick={onClose} className={styles.overlay}></div>
    )
}

export default ModalOverlay