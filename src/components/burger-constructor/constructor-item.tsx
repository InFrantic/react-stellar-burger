import styles from "./constructor-item.module.css";
import React from "react";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteFilling } from "../../services/action/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { TIngredient } from "../../utils/types";
import { Identifier } from "dnd-core";

type TConstructorItem = {
  moveCard: (dragIndex: number, hoverIndex: number, other: Array<{ numberIngredient: string, ingredient: TIngredient }>) => void;
  index: number;
  id: string;
  item: {
    ingredient: TIngredient;
    numberIngredient: string;
  };
};

type TDropCollectedProps = {
  handlerId: Identifier | null
}

type TDragObject = {
  id: string,
  index: number
}
export function ConstructorItem({ moveCard, index, id, item }: TConstructorItem) {

  const dispatch = useAppDispatch();
  const { other } = useAppSelector(store => store.filling)

  function deleteCard(idItem: string) {
    dispatch(deleteFilling(idItem))
  }

  const ref = React.useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<TDragObject, unknown, TDropCollectedProps>({
    accept: "move",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex, other)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "move",
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? styles.hidden : styles.show
  drag(drop(ref))

  return (
    <div ref={ref} data-handler-id={handlerId} className={`${styles.elementConstructor} ${opacity}`}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.ingredient.name}
        price={item.ingredient.price}
        thumbnail={item.ingredient.image}
        handleClose={() => {
          deleteCard(item.numberIngredient)
        }} />
    </div>
  )
}
