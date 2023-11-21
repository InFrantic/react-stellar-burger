import React from "react";
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './reset-password.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getResetPasswordSuccess, password, token } from "../../services/action/reset-password";
import { useDispatch, useSelector } from "react-redux";

export function ResetPassword() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tokenValue = useSelector(store => store.resetPassword.token);
    const passwordValue = useSelector(store => store.resetPassword.password)

    function handleSubmit(e) {
        e.preventDefault();
        if (passwordValue && tokenValue) {
            getResetPasswordSuccess(passwordValue, tokenValue)
                .then(() => {
                    localStorage.removeItem("forgotConfirmed");
                    navigate('/login', { replace: true });
                })
        }
    }

    const checked = localStorage.getItem("forgotPasswordChecked");
    if (!checked) {
      return <Navigate to="/login" replace={true}/>;
    }

    return (
        <div className={`${styles.resetConfirm} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleSubmit}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Восстановление пароля</h3>
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => dispatch(password(e.target.value))}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                    value={passwordValue}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => dispatch(token(e.target.value))}
                    value={tokenValue}
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