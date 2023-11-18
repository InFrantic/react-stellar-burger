import React from "react";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import { Link, Navigate } from 'react-router-dom';
import { getResetPasswordSuccess } from "../../services/action/reset-password";
import { useSelector } from "react-redux";

export function ResetPassword() {

    const login = JSON.parse(sessionStorage.getItem('login'));
    const recovered = useSelector(state => state.resetPassword.success)
    const resetPassword = (e) => {
        e.preventDefault();
        getResetPasswordSuccess()
    }

    const [value, setValue] = React.useState('')
    
    if (login) {
        return (<Navigate to={'/profile'} />)
    }

    if (!recovered) {
        return (<Navigate to={'/forgot-password'} />)
    }

    return (
        <div className={`${styles.resetConfirm} `}>
            <form
                name='register'
                action='#'
                onSubmit={resetPassword}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => setValue(e.target.value)}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Сохранить
                </Button>
                <p className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}>Вспомнили пароль? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${styles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
            </form >
        </div>
    )
}