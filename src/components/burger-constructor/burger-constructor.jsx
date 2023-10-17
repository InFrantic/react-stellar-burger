import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorList } from "./constructor-list";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails } from "../../services/action/order-details";
import { optionalFunc } from "../../utils/prop-types";
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import { clearIngredientDetails } from '../../services/action/ingredient-details';
import { clearOrderDetails } from '../../services/action/order-details';
import {clearBurgerConstructor} from '../../services/action/burger-constructor'

function BurgerConstructor({ onDropHandler }) {

    const [, dropTarget] = useDrop({
        accept: "burgerConstructor",
        drop(ingredient) {
            onDropHandler(ingredient);
        },
    });

    const dispatch = useDispatch();
    const selectedIngredients = useSelector(store => store.filling)
    const bun = selectedIngredients.bun
        , { name, image, price, _id } = { ...bun }
        , other = selectedIngredients.other;


    function getListIdIngredients() {
        const idBun = [_id];
        const idOther = other.map((item) => item.ingredient._id);
        return idBun.concat(idOther, idBun)
    }

    function handleSubmitOrder() {
        const ingredientsOrder = getListIdIngredients();
        dispatch(getOrderDetails(ingredientsOrder))
    }

    function TotalPrice() {

        const { bun, other } = useSelector(store => store.filling)
        const numberOtherIngredients = other.length

        const total = React.useMemo(() => {
            let sumWithInitial = 0

            const costBun = !!(bun) ? bun.price * 2 : 0

            if (numberOtherIngredients > 0) {
                const arrayOtherPrice = other.map((item) => (item.ingredient.price))
                const initialValue = 0;
                sumWithInitial = arrayOtherPrice.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
            }

            return String(costBun + sumWithInitial)

        }, [bun, numberOtherIngredients])

        return (
            <p className="text text_type_digits-medium">{total}</p>
        )
    }
    const order = useSelector(state => state.order.orderNumber)
    const showIngredientDetails = useSelector(store => store.details.details)

    function handleCloseModal() {
        dispatch(clearIngredientDetails())
        dispatch(clearOrderDetails())
        dispatch(clearBurgerConstructor())
        
    }

    return (
        <div className={`ml-4 mt-20 ${styles.burgerConstructor}`}>
            <div ref={dropTarget} className={`pt-5 pb-5 ${styles.dropContainer}`}>
                <div className={styles.list}>
                    {bun && <div>
                        <ConstructorElement extraClass='ml-8 mr-4 notAllowed'
                            type="top"
                            isLocked={true}
                            text={`${name} (верх)`}
                            price={price}
                            thumbnail={image}
                        />
                    </div>}
                    {(other.length > 0) && <ConstructorList />}
                    {bun && <div>
                        <ConstructorElement extraClass="ml-8 mr-4 notAllowed"
                            type="bottom"
                            isLocked={true}
                            text={`${name} (низ)`}
                            price={price}
                            thumbnail={image}
                        />
                    </div>}
                </div>
            </div>
            <div className={`${styles.price} mr-4`}>
                <TotalPrice />
                <div className={`${styles.iconPrice} ml-2 mr-10`} />
                <Button disabled={(!(bun && (other.length > 0)))} htmlType="button" type="primary" size="large"
                    onClick={handleSubmitOrder}>
                    Оформить заказ
                </Button>
            </div>
            {order && <Modal onClose={handleCloseModal}><OrderDetails /></Modal>}
        </div>
    )
}

BurgerConstructor.propTypes = {
    onDropHandler: optionalFunc,
};
export default BurgerConstructor