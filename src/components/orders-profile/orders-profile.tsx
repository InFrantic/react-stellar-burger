import styles from "./orders-profile.module.css";
import Order from "../order/order";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/action/orders";
import { useLocation, Link, useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";

export default function Orders() {

    const dispatch = useAppDispatch();
    const location = useLocation();
    const { isLoading, connectingError, orders } = useAppSelector(store => store.orders);

    const token = localStorage.getItem("accessToken");
    const tokenShot = token?.split('Bearer ')[1];
    const PROFILE_ORDERS_URL = `wss://norma.nomoreparties.space/orders?token=${tokenShot}`;

    const isProfile = useMatch({ path: "/profile/orders", end: false });

    useEffect(() => {
        if (isProfile) {
            dispatch(connect(PROFILE_ORDERS_URL));
            return () => {
                dispatch(disconnect());
            }
        }
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