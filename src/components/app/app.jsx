import styles from "./app.module.css";
import { data } from "../../utils/data";
import { Tab, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'

function App() {
  return (
    <div className={styles.app}>
      <pre style={{
      	margin: "auto",
      	fontSize: "1.5rem"
      }}>
        
          <div>
          <BurgerIcon type="primary" />
          Конструктор
          </div>
          <div>
        <ListIcon type="primary" />
        Лента заказов
        </div>
        <div>
        <ProfileIcon type="primary" />
        Личный кабинет
        </div>
        <Logo />
        
        
        
        
       <Tab />
      </pre >
    </div >
  );
}

export default App;
