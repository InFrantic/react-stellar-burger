import styles from './order-details.module.css';
import doneImage from '../../images/done.svg'
import PropTypes from "prop-types";
import { useAppSelector } from '../../services/store';

function OrderDetails() {
    const orderNumber = useAppSelector(state => state.order.orderNumber)
    return (
        <div className={styles.details}>
            <p className="text text_type_digits-large pb-4">{orderNumber}</p>
            <p className="text text_type_main-medium">идентификатор заказа</p>
            <img src={doneImage} alt="Иконка для готового заказа" className="pt-15 pb-15"></img>
            <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            <p className="text text_type_main-default text_color_inactive pt-2">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );
}
OrderDetails.propTypes = {
    orderNumber: PropTypes.number
  }
export default OrderDetails