import styles from "./burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../services/store";
import { TIngredient } from "../../utils/types";

type TPropsIngredient = {
    currentItem: TIngredient
}

export default function IngredientsRender({ currentItem }: TPropsIngredient) {

    const other = useAppSelector(state => state.filling.other)
    const bun = useAppSelector(state => state.filling.bun)

    const [, dragRef] = useDrag({
        type: "burgerConstructor",
        item: currentItem,

        collect: monitor => ({
            isDrag: monitor.isDragging(),
        }),

    });

    const count = useMemo(() => {
        let count = 0
        if (currentItem.type === 'bun' && bun && bun._id === currentItem._id) {
            count = 2
        }
        if (currentItem.type !== 'bun' && other) {
            count = other.filter(filling => filling.ingredient._id === currentItem._id).length;
        }
        return count
    }, [other, bun])

    const location = useLocation()
    const id = currentItem._id

    return (
        <Link
            key={id}
            className={`${styles.link}`}
            to={`/ingredients/${id}`}
            state={{ background: location }}
        >
            <div className={`${styles["ingredient"]}`} ref={dragRef} >
                <img alt={currentItem.name} src={currentItem.image} className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} />
                <div className={`${styles["ingredient-price"]} pb-1`}>
                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{currentItem.price}</p>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{currentItem.name}</p>
                {count > 0 && <Counter count={count} />}
            </div>
        </Link >
    )
}

