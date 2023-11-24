import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, logout } from '../../services/action/user';

export function Profile() {

    const dispatch = useDispatch();
    const name = useSelector(state => state.user.user.name);
    const email = useSelector(state => state.user.user.email);

    const [value, setValue] = React.useState({
        name: name,
        email: email,
        password: '',
    });

    React.useEffect(() => {
        setValue({
            name: name,
            email: email,
            password: ''
        })
    }, [email, name])

    const saveInfo = (e) => {
        e.preventDefault();
        const { email, name, password } = value;
        dispatch(updateUser(email, name, password));
        setValue({
            name: name,
            email: email,
            password: ''
        })
    }

    const cancelChanges = () => {
        setValue({
            name: '',
            email: '',
            password: ''
        })
    }

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
            <form
                name='edit-data'
                action='#'
                onSubmit={saveInfo}
                className={`mt-30 ${styles.profileData}`}
            >
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue({ ...value, name: e.target.value })}
                    icon='EditIcon'
                    value={value.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <EmailInput
                    extraClass={`mb-6`}
                    placeholder={'Логин'}
                    onChange={e => setValue({ ...value, email: e.target.value })}
                    value={value.email}
                    name={'email'}
                    isIcon={true}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => setValue({ ...value, password: e.target.value })}
                    value={value.password}
                    name={'password'}
                    icon="EditIcon"
                />
                <div className={`${styles.profileButtons}`}>
                    <Button
                        htmlType='button'
                        type="secondary"
                        size="large"
                        onClick={cancelChanges}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType='submit'
                        type="primary"
                        size="large"
                    >
                        Сохранить
                    </Button>
                </div>
            </form >
        </div>
    )
}