import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import bun02 from "../../images/bun-02.png"
import styles from "./burger-constructor.module.css"
import { useState, useContext, useReducer, useMemo, useEffect } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ConstructorContext } from "../../services/appContext";
import { getOrder } from "../../utils/api";
import { v4 as uuid } from 'uuid';

const BurgerConstructor = ({ ingredients }) => {
    const { ingredientConstrutor, setIngredientConstructor } = useContext(ConstructorContext);
    const sauce = useMemo(() => ingredients.filter((item) => item.type === "sauce"), [ingredients]);
    const main = useMemo(() => ingredients.filter((item) => item.type === "main"), [ingredients]);
    const [clickedModal, setClickedModal] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');

    const reducer = (state, action) => {
        switch (action.type) {
            case "add":
                return state + action.payload;
            case "remove":
                return state - action.payload;
            default:
                return state;
        }
    };

    const [priceState, dispatch] = useReducer(reducer, 0);

    useEffect(() => {
        if (ingredientConstrutor.bun !== null) {
            dispatch({ type: "add", payload: ingredientConstrutor.bun.price * 2 });
        }
        if (ingredientConstrutor.ingredients.length !== 0) {
            dispatch({
                type: "add",
                payload: ingredientConstrutor.ingredients.reduce(
                    (acc, curr) => acc + curr.price,
                    0
                ),
            });
        }
    }, [ingredientConstrutor]);

    const handleOpenModal = () => {
        const idIngredient = ingredientConstrutor.ingredients.map(item => item._id);
        const bunId = ingredientConstrutor.bun._id
        const ingredientsId = [bunId, ...idIngredient, bunId];
        getOrder(ingredientsId)
            .then(data => setOrderNumber(data.order.number))
            .catch(err => console.log(err))
        setClickedModal(true);
    };

    const handleCloseModal = (value) => {
        setClickedModal(value)
    };

    return (
        <div className={`${styles["main-container"]}`}>
            <div className={styles["constructor-container"]}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail={bun02}
                />
            </div>
            <div className={`${styles["scroll-inside"]} custom-scroll`}>
                {sauce.map(item => (
                    <div key={item._id} className={`${styles["element"]} pb-2 pt-2 pr-2`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>
                ))}
                {main.map(item => (
                    <div key={item._id} className={`${styles["element"]} pb-2 pt-2 pr-2`}>
                        <DragIcon type="primary" />
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>
                ))}
            </div>
            <div className={styles["constructor-container"]}>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail={bun02}
                />
            </div>
            <div className={`${styles["button-constuctor"]} pr-4`}>
                <div className={`${styles["sum"]}`}>
                    <p className={`pr-2 text text_type_digits-medium`}>{priceState}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
                    Оформить заказ
                </Button>
            </div>
            {clickedModal && <Modal onClose={handleCloseModal}><OrderDetails orderNumber={orderNumber}/></Modal>}
        </div>
    )
}

export default BurgerConstructor