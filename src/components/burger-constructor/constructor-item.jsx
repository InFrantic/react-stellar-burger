import styles from "./constructor-item.module.css";
import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from 'react-redux';
import {deleteFilling} from "../../services/action/burger-constructor";
import {useDrag, useDrop} from "react-dnd";

export function ConstructorItem({moveCard, index, id, item}) {
  const dispatch = useDispatch();
  const {ingredients} = useSelector(store => store.filling)

  function deleteCard(idItem) {
    dispatch(deleteFilling(idItem))
  }

  const ref = React.useRef(null)
  const [{handlerId}, drop] = useDrop({
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
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex, ingredients)
      item.index = hoverIndex
    },
  })

  const [{isDragging}, drag] = useDrag({
    type: "move",
    item: () => {
      return {id, index}
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? styles.hidden : styles.show
  drag(drop(ref))

  return (
    <div ref={ref} data-handler-id={handlerId} className={`${styles.elementConstructor} ${opacity}`}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={(e) => {
          deleteCard(item.numberIngredient, e)
        }}/>
    </div>
  )
}