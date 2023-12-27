import { Button, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './forgot-password.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, email } from "../../services/action/forgot-password";

export function ForgotPassword() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const emailValue = useSelector(store => store.forgotPassword.email)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (emailValue) {
            forgotPassword(emailValue)
                .then(() => {
                    localStorage.setItem("forgotPasswordChecked", "true");
                    navigate('/reset-password', { replace: false });
                })
        }
    }

    return (
        <div className={`${styles.reset} `}>
            <form
                name='register'
                action='#'
                onSubmit={handleSubmit}
                className={`${styles.form}`}
            >
                <h3 className={`mb-6 text text_type_main-medium ${styles.text}`} >Сброс пароля</h3>
                <EmailInput
                    extraClass={`mb-6`}
                    onChange={e => dispatch(email(e.target.value))}
                    value={emailValue}
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