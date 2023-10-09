import styles from "./app.module.css";
import AppHeader from "../appheader/appheader";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import { getIngredients } from "../../utils/api";
import { useEffect, useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    getIngredients()
    .then(data => {
      setIngredients(data)})
    .catch(err => console.log(err))
  }, [])

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.burgers}>
        {ingredients.length > 0 && <BurgerIngredients ingredients={ingredients} /> }
        {ingredients.length > 0 && <BurgerConstructor ingredients={ingredients} /> } 
      </div>
    </div >
  );
}

export default App;
