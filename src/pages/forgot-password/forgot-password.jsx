import React from "react";
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPasswordSuccess } from "../../services/action/forgot-password";

export function ForgotPassword()  {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const success = useSelector(state => state.recoverPassword.success);
    const login = JSON.parse(sessionStorage.getItem('login'));
  
    const [value, setValue] = React.useState('')
   
    const handleClick = React.useCallback((e) => {
      e.preventDefault();
      dispatch(getPasswordSuccess());
      success ? navigate('/reset-password') : navigate('/forgot-password')
    }, [dispatch, navigate, success])
  
    if (login) {
      return (<Navigate to={'/profile'} />)
    }

    return (
        <div className={`${styles.reset} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleClick}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Сброс пароля</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={e => setValue(e.target.value)}
                    value={value}
                    name={'email'}
                    isIcon={false}
                    error={false}
                    errorText={'Ошибка'}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Восстановить
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