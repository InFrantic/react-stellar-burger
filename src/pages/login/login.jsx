import React from "react";
import { useSelector } from 'react-redux';
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';
import { Link, Redirect, useLocation } from 'react-router-dom';
// import { useForm } from '../../hooks/useForm';

export const Login = () => {

    // const isAuthChecked = useSelector(store => store.user.isAuthChecked);
    // const userRequest = useSelector(store => store.user.userRequest)
    // const user = useSelector(store => store.user.userData.name);
    // const { state } = useLocation()

    const userData = {
        email: '',
        password: ''
    }

    // // const { values, handleChange, handleLogin } = useForm(userData);

    // if (isAuthChecked && user) {
    //     return (
    //         <Redirect to={state?.from || '/'} />
    //     );
    // }
    
    const [value, setValue] = React.useState(userData)
    const onChange = e => {
        setValue(e.target.value)
    }
    return (
        <div className={`${styles.login}`}>
            <form
                name='login'
                action='#'
                onSubmit={onChange}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Вход</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={onChange}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={onChange}
                    value={value.password}
                    name={'password'}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Войти
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}>Вы — новый пользователь? &nbsp;
                    <span>
                        <Link to='/register' className={`text text_type_main-default ${styles.link}`}>
                            Зарегистрироваться
                        </Link>
                    </span>
                </p>
                <p className={`text text_color_inactive text_type_main-default ${styles.text}`}>Забыли пароль? &nbsp;
                    <span>
                        <Link to='/forgot-password' className={`text text_type_main-default ${styles.link}`}>
                            Восстановить пароль
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}