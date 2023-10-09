import styles from "./app.module.css";
import AppHeader from "../appheader/appheader";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/api";
import { useEffect, useState } from "react";
import { ConstructorContext, IngredientsContext } from "../../services/appContext";

function App() {
  const [ingredients, setIngredients] = useState([])
  const [ingredientConstrucror, setIngredientConstrucror] = useState({bun: null, ingredients: []})
  useEffect(() => {
    getIngredients()
      .then(data => {
        setIngredients(data)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={{ ingredients, setIngredients }}>
        <ConstructorContext.Provider value={{ingredientConstrucror, setIngredientConstrucror}}>
        <div className={styles.burgers}>
          {ingredients.length > 0 && <BurgerIngredients />}
          {ingredients.length > 0 && <BurgerConstructor />}
        </div>
        </ConstructorContext.Provider>
      </IngredientsContext.Provider>
    </div >
  );
}

export default App;
