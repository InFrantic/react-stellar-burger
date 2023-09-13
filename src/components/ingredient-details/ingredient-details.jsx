import styles from './ingredient-details.module.css';
import ingredientPropType from '../../utils/prop-types';
import IngredientInfo from './ingredient-info'

function IngredientDetails({ data }) {
    return (
        <div className={styles.details}>
            <img src={data.image_large} alt={data.name}></img>
            <p className="text text_type_main-medium pb-4 pt-4">{data.name}</p>
            <div className={`${styles.info} pt-4`}>
                <IngredientInfo text='Калории,ккал' info={data.calories}></IngredientInfo>
                <IngredientInfo text='Белки, г' info={data.proteins}></IngredientInfo>
                <IngredientInfo text='Жиры, г' info={data.fat}></IngredientInfo>
                <IngredientInfo text='Углеводы, г' info={data.carbohydrates}></IngredientInfo>
            </div>
        </div>
    )
}

IngredientDetails.propTypes = ingredientPropType;
export default IngredientDetails