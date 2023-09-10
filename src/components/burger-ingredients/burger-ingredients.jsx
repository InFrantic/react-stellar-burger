import styles from "./burger-ingredients.module.css"
import BurgerTab from './burger-tab'
import IngredientsRender from "./ingredients-list"

function BurgerIngredients({ingredients}) {
    return (
        <div className={`${styles['ingredients']}`}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <BurgerTab />
            <IngredientsRender ingredients={ingredients} />
        </div>
    )
}

export default BurgerIngredients;