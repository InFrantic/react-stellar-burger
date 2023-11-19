import styles from "./burger-ingredients.module.css";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsRender from "./ingredients-list";
import { useState, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';

function BurgerIngredients() {
    const ingredients = useSelector(store => store.burgerIngredients.ingredients);

    const buns = useMemo(() => ingredients.filter(item => item.type === "bun"), [ingredients]);
    const mains = useMemo(() => ingredients.filter(item => item.type === "main"), [ingredients]);
    const sauces = useMemo(() => ingredients.filter(item => item.type === "sauce"), [ingredients]);

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
                    {buns.map((currentItem) => (
                        <IngredientsRender key={currentItem._id} 
                            img={currentItem.image}
                            price={currentItem.price}
                            description={currentItem.name}
                            currentItem={currentItem}
                        />
                    ))}
                </div>
                <p id='sauce' ref={saucesRef} className={`${styles['type']} text text_type_main-medium pt-10`}>Соусы</p>
                <div className={`${styles['ingredient-list']}`}>
                    {sauces.map((currentItem) => (
                        <IngredientsRender key={currentItem._id} 
                            img={currentItem.image}
                            price={currentItem.price}
                            description={currentItem.name}
                            currentItem={currentItem}
                        />
                    ))}
                </div>
                <p id='main' ref={mainsRef} className={`${styles['type']} text text_type_main-medium pt-10`}>Начинка</p>
                <div className={`${styles['ingredient-list']}`}>
                    {mains.map((currentItem) => (
                        <IngredientsRender key={currentItem._id} 
                            img={currentItem.image}
                            price={currentItem.price}
                            description={currentItem.name}
                            currentItem={currentItem}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;