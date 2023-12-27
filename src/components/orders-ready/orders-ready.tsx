import { useSelector } from 'react-redux';
import styles from './orders-ready.module.css';

export const OrdersReady = () => {

    const { orders, total, totalToday } = useSelector(store => store.feed)
    const readyOrders = orders.filter((i) => i.status === 'done')
    const notReadyOrders = orders.filter((i) => i.status !== 'done')

    return (
        <div className={` ${styles.ordersSummaryContainer}`}>
            <article className={`mb-15 ${styles.ordersBoard}`}>
                <div className={` ${styles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${styles.boardTitle}`}> Готовы:</p>
                    <ul className={` ${styles.boardList}`}>
                        {readyOrders.map((order, index) => {
                            if (index < 30) {
                                return (<li key={order._id} className={`text text_type_digits-default text_color_success ${styles.boardItem}`}>{order.number}</li>)
                            }
                        })}
                    </ul>
                </div>
                <div className={` ${styles.board}`}>
                    <p className={`mb-6 text text_type_main-medium ${styles.boardTitle}`}> В работе:</p>
                    <ul className={` ${styles.boardList}`}>
                        {notReadyOrders.map((order, index) => {
                            if (index < 30) {
                                return (<li key={order} className={`text text_type_digits-default ${styles.boardItem}`}>{order.number}</li>)
                            }
                        })}
                    </ul>
                </div>
            </article>
            <p className={`text text_type_main-medium`}>Выполнено за все время:</p>
            <p className={`mb-15 text text_type_digits-large ${styles.ordersNumber}`} >{total}</p>
            <p className={`text text_type_main-medium`}>Выполнено за сегодня:</p>
            <p className={`mb-15 text text_type_digits-large ${styles.ordersNumber}`} >{totalToday}</p>
        </div>
    )
}