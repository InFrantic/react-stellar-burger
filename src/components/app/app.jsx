import styles from "./app.module.css";
import AppHeader from "../appheader/appheader";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function App() {

  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.burgers}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </div >
  );
}

export default App;
