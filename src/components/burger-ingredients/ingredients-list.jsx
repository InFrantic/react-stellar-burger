import styles from "./burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import { useSelector } from "react-redux";
import { useMemo } from "react";

export default function IngredientsRender({ currentItem, onClick }) {

    const other = useSelector(state => state.filling.other)
    const bun = useSelector(state => state.filling.bun)

    const [{ isDrag }, dragRef] = useDrag({
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
    
    return (
        <div className={`${styles["ingredient"]}`} ref={dragRef} onClick={onClick}>
            <img alt={currentItem.name} src={currentItem.image} className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} />
            <div className={`${styles["ingredient-price"]} pb-1`}>
                <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{currentItem.price}</p>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{currentItem.name}</p>
            {count > 0 && <Counter count={count}/>}
        </div>
    )
}
