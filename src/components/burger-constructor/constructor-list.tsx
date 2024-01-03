import styles from "./constructor-list.module.css";
import React from "react";
import { moveFilling } from "../../services/action/burger-constructor";
import { ConstructorItem } from "./constructor-item";
import update, { Spec } from 'immutability-helper'
import { useAppDispatch, useAppSelector } from "../../services/store";
import { TIngredient } from "../../utils/types";

export function ConstructorList() {

  const bun = useAppSelector(store => store.filling.bun)
  const other: Array <{numberIngredient: string, ingredient: TIngredient}> = useAppSelector(store => store.filling.other)
  const dispatch = useAppDispatch();
  const topGap = !bun ? styles.topGap : '';
  const moveCard = React.useCallback((dragIndex: number, hoverIndex: number, other: Array <{numberIngredient: string, ingredient: TIngredient}>) => {

    const newOther = update(other, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, other[dragIndex]],
      ],
    })

    dispatch(moveFilling(newOther)
    )
  }, [])

  return (
    <div className={`${styles.listScroll} ${styles.scroll} ${topGap} custom-scroll`}>
      {other.map((item, i) => (
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