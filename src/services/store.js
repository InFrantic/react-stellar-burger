import {configureStore} from "@reduxjs/toolkit";
import {ingredientsReducer} from "./reducers/burger-ingredients";
import {constructorReducer} from "./reducers/burger-constructor";
import {ingredientDetailsReducer} from "./reducers/ingredient-details";
import {orderDetailsReducer} from "./reducers/order-details";
import { forgotPasswordReducer } from './reducers/forgot-password';
import { resetPasswordReducer } from './reducers/reset-password';
import { getUserInfoReducer } from './reducers/user';
   
export const store = configureStore({
    reducer: {
        burgerIngredients: ingredientsReducer,
        filling: constructorReducer,
        details: ingredientDetailsReducer,
        order: orderDetailsReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        user: getUserInfoReducer
    },
});