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
import { checkUserAuth } from "../../services/action/user";
import { Feed } from "../../pages/feed/feed";
import Orders from "../orders-profile/orders-profile";
import { ProfilePage } from "../../pages/profile/profile-page";
import OrderContent from "../order-content/order-content";
import { useAppDispatch, useAppSelector } from "../../services/store";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAuth());
    dispatch(getIngred());
  }, []);

  const { ingredients, isLoading, hasError } = useAppSelector(store => store.burgerIngredients);
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();

  if (isLoading) {
    return <div className={`text text_type_main-default`}>Загрузка...</div>
  } else {
    if (hasError) {
      return <div className={`text text_type_main-default`}>Произошла ошибка</div>
    } else if (ingredients.length === 0) {
      return <div className={`text text_type_main-default`}>Нет данных</div>
    }
  }

  const handleCloseModals = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app} >
      <AppHeader />
      <main className={styles.burgers} >
        <Routes location={background || location}>
          <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
            <Route index element={<OnlyAuth component={<Profile />} />} />
            <Route path="/profile/orders" element={<OnlyAuth component={<Orders />} />} />
          </Route>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
          <Route path='/register' element={<OnlyUnAuth component={<Register />} />} />
          <Route path='/forgot-password' element={<OnlyUnAuth component={<ForgotPassword />} />} />
          <Route path='/reset-password' element={<OnlyUnAuth component={<ResetPassword />} />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/feed/:number" element={<OrderContent />} />
          <Route path="/profile/orders/:number" element={<OnlyAuth component={<OrderContent />} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {background && (
        <Routes>
          <Route path="/ingredients/:id"
            element={
              <Modal onClose={handleCloseModals}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route path='/feed/:number'
            element={
              <Modal onClose={handleCloseModals}>
                <OrderContent />
              </Modal>
            }
          />
          <Route path="/profile/orders/:number"
            element={
              <OnlyAuth component=
                {<Modal onClose={handleCloseModals}>
                  <OrderContent />
                </Modal>} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
