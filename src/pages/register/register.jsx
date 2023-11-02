import React from "react";
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './register.module.css';
import { Link } from 'react-router-dom';

export const Register = () => {

    const userData = {
        name: '',
        email: '',
        password: ''
    }

    const [value, setValue] = React.useState(userData)
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={`${styles.register} `}>
            <form
                name='register'
                action='#'
                onSubmit={onChange}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Регистрация</h3>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={value.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
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
                    Зарегистрироваться
                </Button>

                <p className={`mb-4 text text_color_inactive text_type_main-default ${styles.text}`}>Уже зарегистрированы? &nbsp;
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