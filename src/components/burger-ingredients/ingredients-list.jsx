import styles from "./burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setIngredientDetails } from "../../services/action/ingredient-details";
import { useMemo } from "react";

export default function IngredientsRender({ currentItem }) {

    const other = useSelector(state => state.filling.other)
    const bun = useSelector(state => state.filling.bun)

    const [{ isDrag }, dragRef] = useDrag({
        type: "burgerConstructor",
        item: currentItem,

        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),

    });
    const dispatch = useDispatch();

    function handleClick() {
        dispatch(setIngredientDetails(currentItem))
    }

    const count = useMemo(() => {
        let count = 0;
        if (currentItem.type === "bun") {
            if (bun !== null && bun._id === currentItem._id) {
                count = 2;
            }
        } else {
            other.forEach((filling) => {
                if (filling._id === currentItem._id) {
                    count += 1;
                }
            });
        }
        return count;
    }, [currentItem.type, bun, other]);

    const canDraggabble = (currentItem?.type !== "bun") ? true : !(count)

    return (
        <div className={`${styles["ingredient"]}`} {...(canDraggabble && { ref: dragRef })} onClick={handleClick}>
            <img alt={currentItem.name} src={currentItem.image} className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} />
            <div className={`${styles["ingredient-price"]} pb-1`}>
                <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{currentItem.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{currentItem.name}</p>
            {(count > 0) ? <Counter count={count} size="default"/> : null}
        </div>
    )
}
