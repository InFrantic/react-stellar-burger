import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { Home } from '../../pages/home/home';
import { Register } from '../../pages/register/register';
import { NotFound } from "../../pages/not-found/not-found";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect } from "react";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { useSelector } from 'react-redux';
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../../pages/protected-route/protected-route";

function App() {

  const location = useLocation();
  const background = location.state?.background;
  const history = useNavigate();
  const state = useSelector(store => store)
  const { pathname } = useLocation();

  const displayBlock = useCallback(
    pathname === '/' ? null : pathname === '/login' ? null : pathname === '/register' ? null : pathname === '/login' ? null : { display: 'block' }
  )
  const displayNone = useCallback(
    pathname === '/' ? null : pathname === '/login' ? null : pathname === '/register' ? null : pathname === '/login' ? null : pathname === '/profile' ? null : { display: 'none' }
  )

  const handleCloseModals = () => {
    history(-1)
  }

  return (
    <div className={styles.app} style={displayBlock}>
      <div style={displayNone}>
        <AppHeader />
      </div>
      <main className={styles.burgers} >
        <Routes location={background || location}>
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {background &&
        (<>
          <Route path='/ingredients/:id' >
            <Modal onClose={handleCloseModals} >
              {state.data.ingredients.length && <IngredientDetails />}
            </Modal>
          </Route >
        </>
        )
      }
    </div >
  );
}

export default App;
