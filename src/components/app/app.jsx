import { DndProvider } from "react-dnd";
import styles from "./app.module.css";
import AppHeader from "../appheader/app-header";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngred } from "../../services/action/burger-ingredients";
import { useEffect, useMemo } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch, useSelector } from "react-redux";
import { addFilling, chooseBun } from "../../services/action/burger-constructor";

function App() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.burgerIngredients.ingredients);

  useEffect(() => {
    dispatch(getIngred());
  }, []);

  const handleDrop = (ingredient) => {
    if (ingredient.type === "bun") {
      dispatch(chooseBun(ingredient))
    } else {
      dispatch(addFilling(ingredient))
    }
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.burgers}>
        <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
          <BurgerConstructor onDropHandler={handleDrop} />
        </DndProvider>
      </main>
    </div >
  );
}

export default App;
