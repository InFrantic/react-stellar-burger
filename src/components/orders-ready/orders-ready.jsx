import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styles from './orders-ready.module.css';
import {WebsocketStatus} from "../../utils/ws";

export const OrdersReady = () => {

    const {status, data} = useSelector(store => store.feed)
    const totalOrders = data?.total;
    const totalOrdersToday = data?.totalToday
    const isDisconnected = status !== WebsocketStatus.ONLINE
    const readyOrders = useCallback(() => {
        return data?.orders?.filter(order => order.status === 'done').map(order => order.number)
    }, [data?.orders]);

    const notReadyOrders = useCallback(() => {
        return data?.orders?.filter(order => order.status !== 'done').map(order => order.number)
    }, [data?.orders]);

    return (
        <div className={` ${styles.ordersSummaryContainer}`}>
            <article className={`mb-15 ${styles.ordersBoard}`}>
                <div className={` ${styles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${styles.boardTitle}`}> Готовы:</p>
                    <ul className={` ${styles.boardList}`}>
                        {
                            readyOrders()?.map((order, index) => {
                                if (index < 20) {
                                    return (<li key={order} className={`text text_type_digits-default text_color_success ${styles.boardItem}`}>{order}</li>)
                                }
                            }
                            )
                        }
                    </ul>
                </div>
                <div className={` ${styles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${styles.boardTitle}`}> В работе:</p>
                    <ul className={` ${styles.boardList}`}>
                        {
                            notReadyOrders()?.map((order, index) => {
                                if (index < 20) {
                                    return (<li key={order} className={`text text_type_digits-default ${styles.boardItem}`}>{order}</li>)
                                }
                            }
                            )
                        }
                    </ul>
                </div>
            </article>
            <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
            <p className={`mb-15 text text_type_digits-large ${styles.ordersNumber}`} >{totalOrders}</p>
            <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
            <p className={`mb-15 text text_type_digits-large ${styles.ordersNumber}`} >{totalOrdersToday}</p>
        </div>
    )
}