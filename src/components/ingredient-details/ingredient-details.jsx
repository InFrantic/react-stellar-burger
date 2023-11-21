import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import IngredientInfo from './ingredient-info'
import { useSelector } from "react-redux";

function IngredientDetails() {

    const params = useParams()
    const idCurrentItem = params.id
    const ingredients = useSelector(store => store.burgerIngredients.ingredients)
    const currentIngredient = ingredients.find(item => item._id === idCurrentItem);
    const { proteins, calories, fat, carbohydrates, name, image_large } = currentIngredient

    return (
        <div className={`${styles.details} pb-5`}>
            <p className="text text_type_main-large">Детали ингредиента</p>
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