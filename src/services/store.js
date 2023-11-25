import { configureStore } from "@reduxjs/toolkit";
import { ingredientsReducer } from "./reducers/burger-ingredients";
import { constructorReducer } from "./reducers/burger-constructor";
import { ingredientDetailsReducer } from "./reducers/ingredient-details";
import { orderDetailsReducer } from "./reducers/order-details";
import { forgotPasswordReducer } from './reducers/forgot-password';
import { resetPasswordReducer } from './reducers/reset-password';
import { getUserInfoReducer } from './reducers/user';
import { feedReducer } from "./reducers/feed";
import { ordersReducer } from "./reducers/orders";
import { socketMiddleware } from './middleware/socket-middleware';
import { FEED_WS_CLOSE, FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN, FEED_CONNECT, FEED_DISCONNECT } from "./action/feed";
import { ORDERS_CONNECT, ORDERS_WS_CONNECTING, ORDERS_WS_ERROR, ORDERS_WS_OPEN, ORDERS_WS_CLOSE, ORDERS_WS_MESSAGE, ORDERS_DISCONNECT } from "./action/orders";

const feedMiddleware = socketMiddleware({
    wsConnect: FEED_CONNECT,
    wsDisconnect: FEED_DISCONNECT,
    wsConnecting: FEED_WS_CONNECTING,
    onOpen: FEED_WS_OPEN,
    onClose: FEED_WS_CLOSE,
    onError: FEED_WS_ERROR,
    onMessage: FEED_WS_MESSAGE
});

const profileFeedMiddleware = socketMiddleware({
    wsConnect: ORDERS_CONNECT,
    wsDisconnect: ORDERS_DISCONNECT,
    wsConnecting: ORDERS_WS_CONNECTING,
    onOpen: ORDERS_WS_OPEN,
    onClose: ORDERS_WS_CLOSE,
    onError: ORDERS_WS_ERROR,
    onMessage: ORDERS_WS_MESSAGE
});

export const store = configureStore({
    reducer: {
        burgerIngredients: ingredientsReducer,
        filling: constructorReducer,
        details: ingredientDetailsReducer,
        order: orderDetailsReducer,
        forgotPassword: forgotPasswordReducer,
        resetPassword: resetPasswordReducer,
        user: getUserInfoReducer,
        feed: feedReducer,
        orders: ordersReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedMiddleware, profileFeedMiddleware);
    }
});

