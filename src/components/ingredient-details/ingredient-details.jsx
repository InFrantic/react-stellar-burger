import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import IngredientInfo from './ingredient-info'

function IngredientDetails({ data }) {
    return (
        <div className={styles.container}>
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

IngredientDetails.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired,
    })
}
export default IngredientDetails