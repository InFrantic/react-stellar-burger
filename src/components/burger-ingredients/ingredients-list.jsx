import styles from "./burger-ingredients.module.css";
// import {data} from "../../utils/data.js";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useMemo } from 'react';

const IngredientsRender = ({ingredients}) => {
    const ingredientType = [...new Set(ingredients.map((item) => item.type))];
    const bun = useMemo(() => ingredients.filter((item) => item.type === "bun"), [ingredients]);
    const sauce = useMemo(() => ingredients.filter((item) => item.type === "sauce"), [ingredients]);
    const main = useMemo(() => ingredients.filter((item) => item.type === "main"), [ingredients]);

    return (

        <div className={`${styles["scroll"]} custom-scroll`}>
            {ingredientType.map((type) => (
                <div key={type}>
                    <p id={type === 'bun' ? 'bun' : type === 'sauce' ? 'sauce' : 'main'}
                        className={`${styles['type-ingredient']} pt-10 pb-5 text text_type_main-medium`}>
                        {type === 'bun' ? 'Булки' : type === 'sauce' ? 'Соусы' : 'Начинки'}</p>
                    <div className={`${styles['ingredient-list']}`}>
                        {type === "bun" && bun.map(item => (
                            <div key={item._id} className={`${styles["ingredient"]}`}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} src={item.image} alt={item.name} />
                                <div className={`${styles["ingredient-price"]} pb-1`}>
                                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{item.name}</p>
                            </div>
                        ))}
                        {type === "sauce" && sauce.map(item => (
                            <div key={item._id} className={`${styles["ingredient"]}`}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} src={item.image} alt={item.name} />
                                <div className={`${styles["ingredient-price"]} pb-1`}>
                                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{item.name}</p>
                            </div>
                        ))}
                        {type === "main" && main.map(item => (
                            <div key={item._id} className={`${styles["ingredient"]}`}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} src={item.image} alt={item.name} />
                                <div className={`${styles["ingredient-price"]} pb-1`}>
                                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{item.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{item.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default IngredientsRender