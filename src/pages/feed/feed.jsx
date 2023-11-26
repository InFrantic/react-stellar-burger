import styles from "./feed.module.css";
import { useSelector, useDispatch } from 'react-redux';
import {OrdersReady} from "../../components/orders-ready/orders-ready";
import { useEffect } from "react";
import { connect, disconnect } from "../../services/action/feed";
import Order from "../../components/order/order";
import { useLocation, Link } from "react-router-dom";

export function Feed() {
    const dispatch = useDispatch();
    const location = useLocation();
    const ordersAllUrl = "wss://norma.nomoreparties.space/orders/all";
    useEffect(() => {
        dispatch(connect(ordersAllUrl));
        return () => {
            dispatch(disconnect(ordersAllUrl));
        }
    }, [dispatch]);

    const { isLoading, connectingError, orders } = useSelector(store => store.feed);

    return (
        <div className={styles.global}>
            <h1 className={`${styles.header} text text_type_main-large pb-5`}>
                Лента заказов
            </h1>
            <main className={`${styles.main} `}>
                <section className={`${styles.section1} pb-10 custom-scroll`}>
                    {isLoading && 'Загрузка...'}
                    {/* {connectingError && 'Произошла ошибка'} */}
                    {!isLoading &&
                        // !connectingError &&
                        orders !== null &&
                        orders.map((order) => (
                            <Link
                                className={styles.link}
                                key={order.number}
                                to={`${"/feed"}/${order.number}`}
                                state={{ background: location }} >
                                <Order key={order._id} order={order} />
                            </Link>
                        )
                        )}
                </section>

                <section className={`${styles.section2} pb-10`}>
                    {isLoading && 'Загрузка...'}
                    {/* {connectingError && 'Произошла ошибка'} */}
                    {!isLoading &&
                        // !connectingError &&
                        orders !== null && <OrdersReady />}

                </section>

            </main>
        </div>
    )
}
