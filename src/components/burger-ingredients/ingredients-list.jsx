import styles from "./burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";

export default function IngredientsRender({ onClick, description, price, img, count, item }) {

    const [{ isDrag }, dragRef] = useDrag({
        type: "ingredient",
        item: { item },
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <>
            {!isDrag &&
                <div className={`${styles["ingredient"]}`} ref={dragRef} onClick={onClick}>
                    <img alt={description} src={img} className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} />
                    <div className={`${styles["ingredient-price"]} pb-1`}>
                        <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{price}</p>
                        <CurrencyIcon type="primary" />
                    </div>
                    <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{description}</p>
                    {count > 1 && <Counter count={count()} size="default" extraClass="m-1"/>}
                </div>}
        </>
    )
}
