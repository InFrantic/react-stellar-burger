import styles from './ingredient-info.module.css'
import ingredientPropType from '../../utils/prop-types';

function IngredientInfo({text, info}) {
  return (
    <div className={styles.info}>
      <p className="text text_type_main-default text_color_inactive">
        {text}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {info}
      </p>
    </div>
  );
}
IngredientInfo.propTypes = ingredientPropType;
export default IngredientInfo