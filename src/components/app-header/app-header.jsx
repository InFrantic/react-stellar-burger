import { NavLink, Link } from 'react-router-dom';
import styles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

function AppHeader() {

  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
        <NavLink to='/' className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${styles.text}`} >
          <BurgerIcon type={pathname === '/' ? "primary" : "secondary"} />
          <p className={`text text_type_main-default ml-2`} style={pathname !== '/' ? { color: '#8585AD' } : { color: '#ffffff' }}>Конструктор</p>
        </NavLink>
        <NavLink to='/feed'  className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${styles.text}`} >
          <ListIcon type={pathname === '/feed' ? "primary" : "secondary"} />
          <p className={`text text_type_main-default ml-2`} style={pathname !== '/feed' ? { color: '#8585AD' } : { color: '#ffffff' }}>Лента заказов</p>
        </NavLink>
      <Link to='/'>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Link>
        <NavLink to='/profile'  className={`pl-5 pr-5 pt-4 pb-4 mt-4 mb-4 ${styles.text}`} >
          <ProfileIcon type={pathname === '/profile' ? "primary" : "secondary"} />
          <p className={`text text_type_main-default ml-2`} style={pathname !== '/profile' ? { color: '#8585AD' } : { color: '#ffffff' }}>Личный кабинет</p>
        </NavLink>
    </header>
  );
}
export default AppHeader