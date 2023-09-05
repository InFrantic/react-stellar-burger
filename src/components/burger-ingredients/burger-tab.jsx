import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerTab = () => {
  const [current, setCurrent] = React.useState("Bun");
  return (
    <div style={{ display: "flex" }}>
      <Tab value="Bun" active={current === "Bun"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Sauce" active={current === "Sauce"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Main" active={current === "Main"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
};
export default BurgerTab;