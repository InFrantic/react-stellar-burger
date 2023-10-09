import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-ingredients.module.css";

const BurgerTab = () => {
  const [current, setCurrent] = React.useState("Bun");

  function tabScroll(ingredientId) {
    const element = document.getElementById(ingredientId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.tab}>
      <div onClick={() => tabScroll("bun")}>
        <Tab value="Bun" active={current === "Bun"} onClick={setCurrent}>
          Булки
        </Tab>
      </div>
      <div onClick={() => tabScroll("sauce")}>
        <Tab value="Sauce" active={current === "Sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
      </div>
      <div onClick={() => tabScroll("main")}>
        <Tab value="Main" active={current === "Main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
    </div>
  );
};
export default BurgerTab;