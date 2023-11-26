import styles from "./orders-profile.module.css";
import Order from "../order/order";
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { connect, disconnect } from "../../services/action/orders";
import { useLocation, Link } from "react-router-dom";

export default function Orders() {

    const dispatch = useDispatch();
    const location = useLocation();
    const { isLoading, connectingError, orders } = useSelector(store => store.orders);

    const token = localStorage.getItem("accessToken");
    const tokenShot = token.split('Bearer ')[1];
    const profileOrdersUrl = `wss://norma.nomoreparties.space/orders?token=${tokenShot}`;

    useEffect(() => {
        dispatch(connect(profileOrdersUrl));
    }, [dispatch]);

    return (
        <div className={`${styles.container} custom-scroll`}>
            {isLoading && 'Загрузка...'}
            {connectingError && 'Произошла ошибка'}
            {!isLoading &&
                !connectingError &&
                orders !== null &&
                [...orders].reverse().map((order) => (
                    <Link
                        className={styles.link}
                        key={order.number}
                        to={`${'/profile/orders'}/${order.number}`}
                        state={{ background: location }} >
                        <Order key={order._id} order={order} />
                    </Link>
                )
                )}
        </div>
    )
}