import styles from "./burger-ingredients.module.css";
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useMemo, useContext } from 'react';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ConstructorContext, IngredientsContext } from "../../services/appContext";
import { useModal } from "../../hooks/useModal";

function IngredientsRender() {
    const { ingredients } = useContext(IngredientsContext);
    const { ingredientConstrutor, setIngredientConstructor } = useContext(ConstructorContext);
    const ingredientType = [...new Set(ingredients.map((ingredient) => ingredient.type))];
    const bun = useMemo(() => ingredients.filter((item) => item.type === "bun"), [ingredients]);
    const sauce = useMemo(() => ingredients.filter((item) => item.type === "sauce"), [ingredients]);
    const main = useMemo(() => ingredients.filter((item) => item.type === "main"), [ingredients]);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const { isModalOpen, openModal, closeModal } = useModal();

    const handleOpenModal = (item) => {
        setSelectedIngredient(item);
        openModal()
        item.type === 'bun' ? setIngredientConstructor({...ingredientConstrutor, bun: item}) : setIngredientConstructor({...ingredientConstrutor, ingredients: [...ingredientConstrutor.ingredients, item] })
     
      };
    const handleCloseModal = () => {
        closeModal(false)
    };
    return (

        <div className={`${styles["scroll"]} custom-scroll`}>
            {ingredientType.map((type) => (
                <div key={type}>

                    <p id={type === 'bun' ? 'bun' : type === 'sauce' ? 'sauce' : 'main'}
                        className={`${styles['type-ingredient']} pt-10 pb-5 text text_type_main-medium`}>
                        {type === 'bun' ? 'Булки' : type === 'sauce' ? 'Соусы' : 'Начинки'}</p>

                    <div className={`${styles['ingredient-list']}`}>

                        {type === "bun" && bun.map((ingredient) => (
                            <div key={ingredient._id} className={`${styles["ingredient"]}`} onClick={() => handleOpenModal(ingredient)}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} src={ingredient.image} alt={ingredient.name} />
                                <div className={`${styles["ingredient-price"]} pb-1`}>
                                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{ingredient.name}</p>
                            </div>
                        ))}

                        {type === "sauce" && sauce.map(ingredient => (
                            <div key={ingredient._id} className={`${styles["ingredient"]}`} onClick={() => handleOpenModal(ingredient)}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} src={ingredient.image} alt={ingredient.name} />
                                <div className={`${styles["ingredient-price"]} pb-1`}>
                                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{ingredient.name}</p>
                            </div>
                        ))}

                        {type === "main" && main.map(ingredient => (
                            <div key={ingredient._id} className={`${styles["ingredient"]}`} onClick={() => handleOpenModal(ingredient)}>
                                <Counter count={1} size="default" extraClass="m-1" />
                                <img className={`${styles["ingredient-img"]} pl-4 pr-4 pb-1`} src={ingredient.image} alt={ingredient.name} />
                                <div className={`${styles["ingredient-price"]} pb-1`}>
                                    <p className={`${styles["price"]} pt-2 pb-2 pr-4 text text_type_digits-default`}>{ingredient.price}</p>
                                    <CurrencyIcon type="primary" />
                                </div>
                                <p className={`${styles["ingredient-name"]} text text_type_main-default`}>{ingredient.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {isModalOpen && <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails data={selectedIngredient}></IngredientDetails></Modal>}
        </div>
    )
}

export default IngredientsRender