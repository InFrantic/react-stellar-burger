import React from "react";
import styles from "./burger-constructor.module.css";
import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { ConstructorList } from "./constructor-list";
import { useDrop } from "react-dnd";
import { getOrderDetails } from "../../services/action/order-details";
import { optionalFunc } from "../../utils/prop-types";
import Modal from '../modal/modal';
import OrderDetails from "../order-details/order-details";
import { clearIngredientDetails } from '../../services/action/ingredient-details';
import { clearOrderDetails } from '../../services/action/order-details';
import { addFilling, chooseBun, clearBurgerConstructor } from '../../services/action/burger-constructor'
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TIngredient } from '../../utils/types'

function BurgerConstructor() {

    const isLoading = useAppSelector(store => store.order.isLoading);

    const onDropHandler = (ingredient:TIngredient) => {
        if (ingredient.type === "bun") {
          dispatch(chooseBun(ingredient))
        } else {
          dispatch(addFilling(ingredient))
        }
      };

    const [, dropTarget] = useDrop<TIngredient, unknown>({
        accept: "burgerConstructor",
        drop(ingredient) {
            onDropHandler(ingredient);
        },
    });

    const dispatch = useAppDispatch();
    const selectedIngredients = useAppSelector(store => store.filling)
    const bun = selectedIngredients.bun
    const { name, image, price, _id } = { ...bun }
    const other = selectedIngredients.other;


    function getListIdIngredients() {
        const idBun = [_id];
        const idOther = other.map((item: { ingredient: { _id: any; }; }) => item.ingredient._id);
        return idBun.concat(idOther, idBun)
    }

    const navigate = useNavigate();
    const user = useAppSelector((store) => store.user.user);

    function handleSubmitOrder() {
        if (!user) {
            navigate('/login')
        } else {
            const ingredientsOrder = getListIdIngredients();
            dispatch(getOrderDetails(ingredientsOrder))
        }
    }

    function TotalPrice() {

        const { bun, other } = useAppSelector(store => store.filling)
        const numberOtherIngredients = other.length

        const total = React.useMemo(() => {
            let sumWithInitial = 0

            const costBun = !!(bun) ? bun.price * 2 : 0

            if (numberOtherIngredients > 0) {
                const arrayOtherPrice = other.map((item: { ingredient: { price: number; }; }) => (item.ingredient.price))
                const initialValue = 0;
                sumWithInitial = arrayOtherPrice.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, initialValue);
            }

            return String(costBun + sumWithInitial)

        }, [bun, numberOtherIngredients])

        return (
            <p className="text text_type_digits-medium">{total}</p>
        )
    }
    const order = useAppSelector(state => state.order.orderNumber)

    function handleCloseModal() {
        dispatch(clearIngredientDetails())
        dispatch(clearOrderDetails())
        dispatch(clearBurgerConstructor())

    }

    return (
        <div className={`ml-4 mt-20 ${styles.burgerConstructor}`}>
            {isLoading && <div>Ваш заказ обрабатывается</div>}
            <div ref={dropTarget} className={`pt-5 pb-5 ${styles.dropContainer}`}>
                <div className={styles.list}>
                    {bun && <div>
                        <ConstructorElement extraClass='ml-8 mr-4 notAllowed'
                            type="top"
                            isLocked={true}
                            text={`${name} (верх)`}
                            price={price!}
                            thumbnail={image!}
                        />
                    </div>}
                    {(other.length > 0) && <ConstructorList />}
                    {bun && <div>
                        <ConstructorElement extraClass="ml-8 mr-4 notAllowed"
                            type="bottom"
                            isLocked={true}
                            text={`${name} (низ)`}
                            price={price!}
                            thumbnail={image!}
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