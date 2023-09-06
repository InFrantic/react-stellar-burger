import styles from "./burger-ingredients.module.css"
import BurgerTab from './burger-tab'
// import RenderList from './ingredients-list'
import List from "../../utils/data"

function BurgerIngredients() {
    return (
        <div className={styles.ingredients}>
            <p className="text text_type_main-large mb-5 mt-10">Соберите бургер</p>
            <BurgerTab />
            
                <List />
            
        </div>
    )
}

export default BurgerIngredients;