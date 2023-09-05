import styles from "./burger-ingredients.module.css"
import BurgerTab from './burger-tab';

function BurgerIngredients() {
    return (
        <div className={styles.ingredients}>
            <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
            <BurgerTab />
            <div>
                
            </div>
        </div>
    )
}

export default BurgerIngredients;