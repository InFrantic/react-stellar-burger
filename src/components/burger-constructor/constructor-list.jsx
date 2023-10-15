import styles from "./constructor-list.module.css";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { moveFilling } from "../../services/action/burger-constructor";
import { ConstructorItem } from "./constructor-item";
import update from 'immutability-helper'

export function ConstructorList() {

    const { bun, ingredients } = useSelector(store => store.filling)
    const dispatch = useDispatch();
    const topGap = !bun ? styles.topGap : '';

    const moveCard = React.useCallback((dragIndex, hoverIndex, ingredients) => {

        const newOther = update(ingredients, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, ingredients[dragIndex]],
          ],
        })
    
        dispatch(moveFilling(newOther)
        )
      }, [])

    return (
        <div className={`${styles.listScroll} ${styles.scroll} ${topGap} custom-scroll`}>
            {ingredients.map((item, i) => (
                <ConstructorItem 
                moveCard={moveCard} 
                index={i} 
                key={item.numberIngredient} 
                id={item.numberIngredient} 
                item={item}>
                </ConstructorItem>
            ))}
        </div>
    )
}