import React from "react";
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { useSelector } from 'react-redux';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'

export function Profile() {

    const store = useSelector(store => store);

    const userData = {
        name: '',
        email: '',
        password: ''
    }

    const { values, handleChange, isFormEdited, handleResetForm, handleUpdateUser } = React.useState(userData);

    const isActive = isFormEdited && (values.name.length ? true : false) && (values.password.length > 5 ? true : false)

    return (
        <div className={`${styles.profile}`}>
            <nav className={`mt-30 ${styles.menu}`}>
                <NavLink className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.link_active}>
                    Профиль
                </NavLink>
                <NavLink className={`text text_type_main-medium ${styles.link}`} activeClassName={styles.link_active}>
                    История заказов
                </NavLink>
                <button
                    type="button"
                    className={`text text_type_main-medium text_color_inactive from global ${styles.button}`}
                    onClick={null}
                >
                    Выход
                </button>

                <p className={`mt-20 text text_color_inactive text_type_main-default ${styles.text}`}>В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav >
            <form
                name='edit-data'
                action='#'
                onSubmit={handleUpdateUser}
                className={`mt-30 ${styles.profileData}`}
            >
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={handleChange}
                    icon={'EditIcon'}
                    value={values.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <EmailInput
                    extraClass={`mb-6`}
                    placeholder={'Логин'}
                    onChange={handleChange}
                    value={values.email}
                    name={'email'}
                    isIcon={true}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={handleChange}
                    value={values.password}
                    name={'password'}
                    icon="EditIcon"
                />
                <div className={`${styles.profileButtons}`}>
                    <Button
                        htmlType='button'
                        type="secondary"
                        size="large"
                        disabled={!isFormEdited}
                        onClick={handleResetForm}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType='submit'
                        type="primary"
                        size="large"
                        disabled={!isActive}
                    >
                        Сохранить
                    </Button>
                </div>

            </form >
        </div>
    )
}