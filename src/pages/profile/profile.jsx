import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, getUserInfo } from '../../services/action/user';
import { letLogoutUser } from '../../services/action/login';

export function Profile() {

    const dispatch = useDispatch();
    const currentName = useSelector(state => state.user.user.name);
    const currentEmail = useSelector(state => state.user.user.email);
    const login = JSON.parse(sessionStorage.getItem('login'));

    const [value, setValue] = React.useState({
        name: currentName,
        email: currentEmail,
        password: '',
    });

    useEffect(() => {
        setValue({
            name: currentName,
            email: currentEmail,
            password: ''
        })
    }, [currentEmail, currentName])

    const saveInfo = (e) => {
        e.preventDefault();
        const { email, name, password } = value;
        dispatch(setUserInfo(email, name, password));
        setValue({
            name: currentName,
            email: currentEmail,
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
        dispatch(letLogoutUser());
        sessionStorage
            .setItem('login', JSON.stringify(false));
    }, [dispatch])

   useEffect(() => {
        if (login) {
            dispatch(getUserInfo());
        }
    }, [dispatch, login])


    return (
        <div className={`${styles.profile}`}>
            <nav className={`mt-30 ${styles.menu}`}>
                <NavLink className={`text text_type_main-medium ${styles.link}`}>
                    Профиль
                </NavLink>
                <NavLink className={`text text_type_main-medium ${styles.link}`} >
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
                    icon={'EditIcon'}
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
                    onChange={e => setValue({ ...value, name: e.target.value })}
                    value={value.email}
                    name={'email'}
                    isIcon={true}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => setValue({ ...value, name: e.target.value })}
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