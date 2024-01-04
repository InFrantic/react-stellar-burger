import React from "react";
import styles from './profile.module.css';
import { Button, EmailInput, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { updateUser } from '../../services/action/user';
import { useAppDispatch, useAppSelector } from "../../services/store";

export function Profile() {

    const dispatch = useAppDispatch();
    const name = useAppSelector(state => state.user.user.name);
    const email = useAppSelector(state => state.user.user.email);

    const [value, setValue] = React.useState({
        name: name,
        email: email,
        password: '',
    });

    React.useEffect(() => {
        setValue({
            name: name,
            email: email,
            password: ''
        })
    }, [email, name])

    const saveInfo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, name, password } = value;
        dispatch(updateUser(email, name, password));
        setValue({
            name: name,
            email: email,
            password: ''
        })
    }

    const cancelChanges = () => {
        setValue({
            name: '',
            email: '',
            password: ''
        })
    }

    return (
        <div className={`${styles.profile}`}>
            <form
                name='edit-data'
                action='#'
                onSubmit={saveInfo}
                className={`mt-30 ${styles.profileData}`}
            >
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => setValue({ ...value, name: e.target.value })}
                    icon='EditIcon'
                    value={value.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                    extraClass={`mb-6`}
                />
                <EmailInput
                    extraClass={`mb-6`}
                    placeholder={'Логин'}
                    onChange={e => setValue({ ...value, email: e.target.value })}
                    value={value.email}
                    name={'email'}
                    isIcon={true}
                />
                <PasswordInput
                    extraClass={`mb-6`}
                    onChange={e => setValue({ ...value, password: e.target.value })}
                    value={value.password}
                    name={'password'}
                    icon="EditIcon"
                />
                <div className={`${styles.profileButtons}`}>
                    <Button
                        htmlType='button'
                        type="secondary"
                        size="large"
                        onClick={cancelChanges}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType='submit'
                        type="primary"
                        size="large"
                    >
                        Сохранить
                    </Button>
                </div>
            </form >
        </div>
    )
}