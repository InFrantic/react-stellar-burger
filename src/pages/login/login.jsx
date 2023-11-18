import { useEffect, useState } from "react";
import { Button, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './login.module.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getLoginUser } from '../../services/action/login';
import { useDispatch } from 'react-redux';

export function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const login = JSON.parse(sessionStorage.getItem('login'));

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email,
            password
        }
        dispatch(getLoginUser(user))
    }
    useEffect(() => {
        if (login) {
            navigate('/')
        }
    }, [login, navigate])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className={`${styles.login}`}>
            <form
                name='login'
                action='#'
                onSubmit={handleSubmit}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Вход</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => setPassword(e.target.value)}
                    value={password}
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