import styles from './ingredient-info.module.css'
import PropTypes from 'prop-types'

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
IngredientInfo.propTypes = {
  text: PropTypes.string.isRequired,
  info: PropTypes.number.isRequired
}
export default IngredientInfo