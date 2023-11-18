import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import { Route, Routes } from 'react-router-dom';
import { Login } from '../../pages/login/login';
import { Home } from '../../pages/home/home';
import { Register } from '../../pages/register/register';
import { NotFound } from "../../pages/not-found/not-found";
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import { ForgotPassword } from "../../pages/forgot-password/forgot-password";
import { ResetPassword } from "../../pages/reset-password/reset-password";
import { Profile } from "../../pages/profile/profile";
import { OnlyAuth, OnlyUnAuth } from "../../pages/protected-route/protected-route";
import { getIngred } from "../../services/action/burger-ingredients";
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getIngred());
  }, []);

  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  const handleCloseModals = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app} >
      <AppHeader />
      <main className={styles.burgers} >
        <Routes location={background || location}>
          <Route path="/profile" element={<OnlyAuth component={<Profile />} />} />
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {background && 
        <Routes>
          <Route path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseModals}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      }
    </div>
  );
}

export default App;
