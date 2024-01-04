import { FEED_CONNECT, FEED_DISCONNECT, FEED_WS_CLOSE, FEED_WS_CONNECTING, FEED_WS_ERROR, FEED_WS_MESSAGE, FEED_WS_OPEN } from "../services/action/feed";
import { ORDERS_CONNECT, ORDERS_DISCONNECT, ORDERS_WS_CLOSE, ORDERS_WS_CONNECTING, ORDERS_WS_ERROR, ORDERS_WS_MESSAGE, ORDERS_WS_OPEN } from "../services/action/orders";

export type TIngredient = {
    calories: number;
    carbohydrates: number;
    fat: number;
    image: string;
    image_large: string;
    image_mobile: string;
    name: string;
    price: number;
    proteins: number;
    type: string;
    __v: number;
    _id: string;
};

export type TOrder = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: string;
    status: string;
    updatedAt: string;
    _id: string;
};

export type TWSMessage = {
    orders: TOrder[];
    success: boolean;
    total: number;
    totalToday: number;
};

export type TwsActions = {
    wsConnect: string | typeof FEED_CONNECT | typeof ORDERS_CONNECT;
    wsDisconnect: string | typeof FEED_DISCONNECT | typeof ORDERS_DISCONNECT;
    wsConnecting: string | typeof FEED_WS_CONNECTING | typeof ORDERS_WS_CONNECTING;
    onOpen: string | typeof FEED_WS_OPEN | typeof ORDERS_WS_OPEN;
    onClose: string | typeof FEED_WS_CLOSE | typeof ORDERS_WS_CLOSE;
    onError: string | typeof FEED_WS_ERROR | typeof ORDERS_WS_ERROR;
    onMessage: string | typeof FEED_WS_MESSAGE | typeof ORDERS_WS_MESSAGE;
    wsSendMessage?: string
}

export type TUser = {
    email: string;
    name: string;
}

export type TOrderWithNumber = {
    success: boolean;
    orders: TOrder;
};
