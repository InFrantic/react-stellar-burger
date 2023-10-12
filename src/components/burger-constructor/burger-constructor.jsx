import { ConstructorElement, DragIcon, Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css"
import { useState, useContext, useReducer, useEffect } from 'react';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ConstructorContext } from "../../services/appContext";
import { getOrder } from "../../utils/api";
import { v4 as uuid } from 'uuid';

function BurgerConstructor() {
    const { ingredientConstrutor } = useContext(ConstructorContext);
    const topping = ingredientConstrutor.ingredients.filter((item) => item.type !== "bun");
    const bun = ingredientConstrutor.bun;
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
                {bun &&
                    <ConstructorElement
                        type={`${'top'} ${bun.type}`}
                        isLocked
                        text={`${bun.name} ${'(Верх)'}`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}

                    />}
            </div>
            <div className={`${styles["scroll-inside"]} custom-scroll`}>
                {topping.map(item => (
                    <div key={uuid()} className={`${styles["element"]} pb-2 pt-2 pr-2`} >
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
                {bun &&
                    <ConstructorElement
                        type={`${'bottom'} ${bun.type}`}
                        isLocked
                        text={`${bun.name} ${'(Низ)'}`}
                        price={bun.price}
                        thumbnail={bun.image_mobile}

                    />}
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
            {clickedModal && <Modal onClose={handleCloseModal}><OrderDetails orderNumber={orderNumber} /></Modal>}
        </div>
    )
}

export default BurgerConstructor