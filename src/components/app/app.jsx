import styles from "./app.module.css";
import AppHeader from "../appheader/appheader";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
// import { getIngredients } from "../../utils/api";
import { useEffect, useState } from "react";

function App() {
  const [ingredients, setIngredients] = useState([])

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    try {
      const url = 'https://norma.nomoreparties.space/api/ingredients';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      setIngredients(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.burgers}>
        {ingredients.length > 0 && <BurgerIngredients ingredients={ingredients} /> }
        <BurgerConstructor /> 
      </div>
    </div >
  );
}

export default App;
