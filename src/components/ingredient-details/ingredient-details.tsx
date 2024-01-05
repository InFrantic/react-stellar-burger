import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import IngredientInfo from './ingredient-info'
import { useAppSelector } from '../../services/store';
import { TIngredient } from '../../utils/types';

function IngredientDetails() {

    const { id } = useParams();
    const ingredients = useAppSelector(store => store.burgerIngredients.ingredients)
    const ingredient  = ingredients?.find((item: TIngredient) => item._id === id);
    if (!ingredient) {return null};
    return (
        <div className={`${styles.details} pb-5`}>
            <p className="text text_type_main-large">Детали ингредиента</p>
            <img src={ingredient.image_large} alt={ingredient.name}></img>
            <p className="text text_type_main-medium pb-4 pt-4">{ingredient.name}</p>
            <div className={`${styles.info} pt-4`}>
                <IngredientInfo text='Калории,ккал' info={ingredient.calories}></IngredientInfo>
                <IngredientInfo text='Белки, г' info={ingredient.proteins}></IngredientInfo>
                <IngredientInfo text='Жиры, г' info={ingredient.fat}></IngredientInfo>
                <IngredientInfo text='Углеводы, г' info={ingredient.carbohydrates}></IngredientInfo>
            </div>
        </div>
    )
}
export default IngredientDetails