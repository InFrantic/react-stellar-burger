import React from "react";
import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css';
import { Link } from 'react-router-dom';

export function ForgotPassword()  {

    const userData = {
        email: '',
    }

    const [value, setValue] = React.useState(userData)
    const onChange = e => {
        setValue(e.target.value)
    }

    return (
        <div className={`${styles.reset} `}>
            <form
                name='register'
                action='#'
                onSubmit={onChange}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Сброс пароля</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={onChange}
                    value={value.email}
                    name={'email'}
                    isIcon={false}
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