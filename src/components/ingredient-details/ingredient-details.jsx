import { useLocation, useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import IngredientInfo from './ingredient-info'
import { useSelector } from "react-redux";

function IngredientDetails() {

    const params = useParams()
    const idCurrentItem = params.id
    console.log(idCurrentItem)
    const ingredients = useSelector(store => store.burgerIngredients.ingredients)
    console.log(ingredients)
    const currentIngredient = ingredients.find(item => item._id === idCurrentItem);
    const { proteins, calories, fat, carbohydrates, name, image_large } = currentIngredient
    const location = useLocation()
    const background = location.state && location.state.background;
    const testContainer = background ? "" : "container"
    return (
        <div className={`${styles.details} ${testContainer} pb-5`}>
            {!background && <p className="text text_type_main-large">Детали ингредиента</p>}
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