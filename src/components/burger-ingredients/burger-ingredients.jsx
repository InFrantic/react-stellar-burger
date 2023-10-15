import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsRender from "./ingredients-list";
import { useState, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { setIngredientDetails } from '../../services/action/ingredient-details';
import { useModal } from "../../hooks/useModal";
import Modal from '../modal/modal';

function BurgerIngredients() {
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);
    const dispatch = useDispatch()
    const selectedBun = useSelector(state => state.filling.bun)
    const selectedIngredients = useSelector(state => state.filling.ingredients)

    const ingredient = {
        main: 'main',
        sauce: 'sauce',
        bun: 'bun'
    }

    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);

    const { isModalOpen, openModal, closeModal } = useModal();

    const handleOpenModal = (item) => {
        dispatch(setIngredientDetails(item))
        openModal(true);
    }
    const handleCloseModal = (value) => {
        closeModal(value)
    };

    const [activeTab, setActiveTab] = useState('Bun')
    const bunsRef = useRef();
    const saucesRef = useRef();
    const mainsRef = useRef();
    const tabsRef = useRef()

    function handleScrollIngredients() {
        const tabsBottom = tabsRef.current?.getBoundingClientRect().bottom;
        const bunsTop = bunsRef.current?.getBoundingClientRect().top;
        const saucesTop = saucesRef.current?.getBoundingClientRect().top;
        const mainsTop = mainsRef.current?.getBoundingClientRect().top;

        if (!tabsBottom || !bunsTop || !saucesTop || !mainsTop) {
            return;
        };
        const TabsBottomPadding = (tabsBottom - 50)
        const min = Math.min(Math.abs(bunsTop - TabsBottomPadding), Math.abs(saucesTop - TabsBottomPadding), Math.abs(mainsTop - TabsBottomPadding))
        const newTab = min === Math.abs(bunsTop - TabsBottomPadding) ? "Bun" : min === Math.abs(saucesTop - TabsBottomPadding) ? "Sauce" : "Main"
        if (newTab !== activeTab) {
            setActiveTab(newTab)
        }
    }

    const totalCount = useCallback((item) => {
        if (selectedBun && item.type === ingredient.bun) {
            return selectedBun._id === item._id ? 2 : 0
        } else {
            return selectedIngredients.filter(ingred => ingred.ingredient._id === item._id).length
        }
    }, [selectedIngredients, selectedBun]
    )

    function tabScroll(ingredientId) {
        const element = document.getElementById(ingredientId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className={`${styles['ingredients']}`}>
            <p className="text text_type_main-large mb-5">Соберите бургер</p>
            <div className={styles.tab} ref={tabsRef}>
                <div onClick={() => tabScroll("bun")}>
                    <Tab value="Bun" active={activeTab === "Bun"} onClick={setActiveTab}>
                        Булки
                    </Tab>
                </div>
                <div onClick={() => tabScroll("sauce")}>
                    <Tab value="Sauce" active={activeTab === "Sauce"} onClick={setActiveTab}>
                        Соусы
                    </Tab>
                </div>
                <div onClick={() => tabScroll("main")}>
                    <Tab value="Main" active={activeTab === "Main"} onClick={setActiveTab}>
                        Начинки
                    </Tab>
                </div>
            </div>
            <div className={`${styles["scroll"]} custom-scroll`} onScroll={handleScrollIngredients}>

                <p id='bun' ref={bunsRef} className={`${styles['type']} text text_type_main-medium pt-10`}>Булки</p>
                <div className={`${styles['ingredient-list']}`}>
                    {buns.map((item) => (
                        <IngredientsRender key={item._id} onClick={() => handleOpenModal(item)}
                            img={item.image}
                            price={item.price}
                            description={item.name}
                            count={selectedBun !== null ? totalCount(item) : 0}
                            item={item}
                        />
                    ))}
                </div>
                <p id='sauce' ref={saucesRef} className={`${styles['type']} text text_type_main-medium pt-10`}>Соусы</p>
                <div className={`${styles['ingredient-list']}`}>
                    {sauces.map((item) => (
                        <IngredientsRender key={item._id} onClick={() => handleOpenModal(item)}
                            img={item.image}
                            price={item.price}
                            description={item.name}
                            count={selectedIngredients.length !== 0 ? totalCount(item) : 0}
                            item={item}
                        />
                    ))}
                </div>
                <p id='main' ref={mainsRef} className={`${styles['type']} text text_type_main-medium pt-10`}>Начинка</p>
                <div className={`${styles['ingredient-list']}`}>
                    {mains.map((item) => (
                        <IngredientsRender key={item._id} onClick={() => handleOpenModal(item)}
                            img={item.image}
                            price={item.price}
                            description={item.name}
                            count={selectedBun === null ? 0 : totalCount(item)}
                            item={item}
                        />
                    ))}
                </div>
            </div>
            {isModalOpen && <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails></IngredientDetails></Modal>}
        </div>
    )
}

export default BurgerIngredients;