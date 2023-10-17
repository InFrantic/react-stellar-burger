import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types'
import IngredientInfo from './ingredient-info'
import {useSelector} from "react-redux";

function IngredientDetails() {
    const {proteins, calories, fat, carbohydrates, name, image_large} = useSelector(store => store.details.details)
    return (
        <div className={styles.details}>
            <img src={image_large} alt={name}></img>
            <p className="text text_type_main-medium pb-4 pt-4">{name}</p>
            <div className={`${styles.info} pt-4`}>
                <IngredientInfo text='Калории,ккал' info={calories}></IngredientInfo>
                <IngredientInfo text='Белки, г' info={proteins}></IngredientInfo>
                <IngredientInfo text='Жиры, г' info={fat}></IngredientInfo>
                <IngredientInfo text='Углеводы, г' info={carbohydrates}></IngredientInfo>
            </div>
        </div>
    )
}
export default IngredientDetails