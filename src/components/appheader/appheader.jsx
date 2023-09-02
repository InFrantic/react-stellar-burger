import styles from './appheader.module.css';
import  HeaderPanel  from './header-panel/header-panel';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader(){
return (
  <header className={`${styles.header} p-3`}>
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <HeaderPanel>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </HeaderPanel>
        <HeaderPanel>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive pl-2">
            Лента заказов
          </p>
        </HeaderPanel>
      </div>

      <div className={styles.logo}>
        <Logo />
      </div>

      <HeaderPanel>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive pl-2">
          Личный кабинет
        </p>
      </HeaderPanel>
    </div>
  </header>
);
}
export default AppHeader