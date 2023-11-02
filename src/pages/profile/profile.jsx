import { NavLink, Route, Switch } from 'react-router-dom';
import profileStyle from './profile.module.css';
// import { ProfileData } from '../../components/profile-data/profile-data';

export function Profile() {

   
    return (
        <div className={`${profileStyle.profile}`}>
            <nav className={`mt-30 ${profileStyle.menu}`}>
                <NavLink  className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    Профиль
                </NavLink>
                <NavLink  className={`text text_type_main-medium ${profileStyle.link}`} activeClassName={profileStyle.link_active}>
                    История заказов
                </NavLink>
                <button
                    type="button"
                    className={`text text_type_main-medium text_color_inactive from global ${profileStyle.button}`}
                    onClick={null}
                >
                    Выход
                </button>

                <p className={`mt-20 text text_color_inactive text_type_main-default ${profileStyle.text}`}>В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav >
            {/* <article className={profileStyle.content} >
                <Switch>
                    <Route path={`${url}`} exact>
                        <ProfileData />
                    </Route>
                </Switch>
            </article > */}
        </div>
    )
}