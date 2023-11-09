import React from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import { Link, Navigate } from 'react-router-dom';
import { getRegisterUser } from '../../services/action/register'
import { useDispatch, useSelector } from 'react-redux';

export function Register() {

    const success = useSelector(state => state.user.success);
   

    const dispatch = useDispatch();

    const register = (e) => {
        e.preventDefault();
        const user = {
            name: value.name,
            email: value.email,
            password: value.password
        };
        dispatch(getRegisterUser(user));
    }

    const userData = {
        name: '',
        email: '',
        password: ''
    }

    const [value, setValue] = React.useState(userData)

   

    return (
        <div className={`${styles.register} `}>
            <form
                name='register'
                action='#'
                onSubmit={register}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Регистрация</h3>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue({ ...value, name: e.target.value })}
                    value={value.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={e => setValue({ ...value, email: e.target.value })}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => setValue({ ...value, password: e.target.value })}
                    value={value.password}
                    name={'password'}
                />
                <Button
                    htmlType='submit'
                    type="primary"
                    size="large"
                    extraClass={`mb-20`}
                >
                    Зарегистрироваться
                </Button>

                <p className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}>Уже зарегистрированы? &nbsp;
                    <span>
                        <Link to='/login' className={`text text_type_main-default ${styles.link}`}>
                            Войти
                        </Link>
                    </span>
                </p>
                {success ? <Navigate to={'/login'} /> : <Navigate to={'/register'} />}
            </form >
        </div>
    )
}