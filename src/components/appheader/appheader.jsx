import styles from './appheader.module.css';
import HeaderPanel from './header-panel/header-panel';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.header}>
      <HeaderPanel>
        <BurgerIcon />
        Конструктор
      </HeaderPanel>
      <HeaderPanel >
        <ListIcon />
        Лента заказов
      </HeaderPanel>
      <div className={styles.logo}>
        <Logo />
      </div>
      <HeaderPanel>
        <ProfileIcon />
        Личный кабинет
      </HeaderPanel>
    </header>
  );
}
export default AppHeader