import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerTab = () => {
  const [current, setCurrent] = React.useState("Bun");
  const tabScroll = (ingredientId) => {
    const element = document.getElementById(ingredientId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex" }}>
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