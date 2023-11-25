import React from "react";
import { NavLink, Outlet } from 'react-router-dom';
import styles from './profile.module.css';
import { logout } from '../../services/action/user';
import { useDispatch } from "react-redux";

export function ProfilePage() {

    const dispatch = useDispatch();
    const logoutUser = React.useCallback(() => {
        dispatch(logout());
    }, [dispatch])

    return (
        <div className={`${styles.profile}`}>
            <nav className={`mt-30 ${styles.menu}`}>
                <NavLink className={`text text_type_main-medium ${styles.link}`} to='/profile'>
                    Профиль
                </NavLink>
                <NavLink className={`text text_type_main-medium ${styles.link}`} to={"/profile/orders"}>
                    История заказов
                </NavLink>
                <button
                    type="button"
                    className={`text text_type_main-medium text_color_inactive from global ${styles.button}`}
                    onClick={logoutUser}
                >
                    Выход
                </button>

                <p className={`mt-20 text text_color_inactive text_type_main-default ${styles.text}`}>В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav >
            <Outlet />
        </div>
    )
}