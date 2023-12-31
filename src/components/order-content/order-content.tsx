import { useParams, useLocation } from "react-router-dom";
import { useEffect, useMemo } from "react";
import styles from "./order-content.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { setCurrentOrder } from "../../services/action/currentOrder";
import { RootState, useAppDispatch, useAppSelector } from "../../services/store";
import { TIngredient } from "../../utils/types";

export default function OrderContent() {

    const dispatch = useAppDispatch();
    const { number } = useParams();
    const location = useLocation();

    const background = location.state?.background;
    const findOrder = (store: RootState) => {
        let order;
        order = store.feed.orders?.find((order) => order.number == number);
        if (order) {
            return order;
        }
        order = store.orders.orders?.find((order) => order.number == number);
        if (order) {
            return order;
        }
        order = store.currentOrder.current?.find((order) => order.number == number);
        if (order) {
            return order;
        }
    };

    const order = useAppSelector(findOrder);
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients);

    const orderIngredients = useMemo(() =>
        order?.ingredients.map((ingredientId: string) =>
            ingredients?.find((ingredient: TIngredient) =>
                ingredientId === ingredient._id
            ))
        , [ingredients, order]) as TIngredient[];


    useEffect(() => {
        if (!order) {
            dispatch(setCurrentOrder(number!))
        }
    }, [dispatch, number, order]);

    const multiply = (ingredient: TIngredient) => {
        let res = orderIngredients?.filter((x) => x._id === ingredient._id);
        return res.length
    }

    const getUnique = (arr: TIngredient[]) =>
        arr?.filter((el, ind) => ind === arr.indexOf(el));


    const uniqueOrderIngredients = getUnique(orderIngredients);

    const orderPrice = useMemo(() =>
        orderIngredients?.reduce((acc, i) => acc + i.price, 0)
        , [orderIngredients]);

    if (!order) {
        return null;
    }

    return (
        <div className={background ? styles.container : styles.page}>
            <p className={`${styles.number} text text_type_digits-default`}>{`#0${order.number}`}</p>
            <p className="text text_type_main-medium mt-10 mb-3">
                {order.name}
            </p>
            {order.status === 'done' ? (
                <p className={`${styles.statusDone} text text_type_main-default mb-15`} >
                    {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : null}
                </p>
            ) : (
                <p className="text text_type_main-default mb-15" >
                    {order.status === 'done' ? 'Выполнен' : order.status === 'pending' ? 'Готовится' : order.status === 'created' ? 'Создан' : null}
                </p>
            )
            }
            <p className="text text_type_main-medium mb-6">
                Состав:
            </p>
            <div className={`${styles.cards} custom-scroll mb-10`}>
                {uniqueOrderIngredients?.map((ingredient) => (
                    <div className={styles.card} key={ingredient._id}>
                        <div className={styles.cardinfo}>
                            <div className={styles.imgbox}>
                                <img alt={ingredient.name} src={ingredient.image} className={styles.picture}></img>
                            </div>
                            <p className="text text_type_main-default">
                                {ingredient.name}
                            </p>
                        </div>
                        <div className={styles.price}>
                            <p className="text text_type_digits-default pr-2">{`${multiply(ingredient)} х ${ingredient.price}`}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </div>
                )
                )}
            </div >
            <div className={styles.totalprice}>
                <p className="text text_type_main-default text_color_inactive"><FormattedDate date={new Date(order.createdAt)} /></p>
                <div className={styles.price}>
                    <p className="text text_type_digits-default pr-2">{orderPrice}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}