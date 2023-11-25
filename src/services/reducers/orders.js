import {
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE
} from "../action/orders";

const initialState = {
  isLoading: false,
  feedConnected: false,
  connectingError: null,
  orders: [],
  total: null,
  totalToday: null
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING:
      return {
        ...state,
        isLoading: true,
      };
    case ORDERS_WS_OPEN:
      return {
        ...state,
        isLoading: false,
        feedConnected: true,
      };
    case ORDERS_WS_ERROR:
      return {
        ...state,
        connectingError: action.payload,
      };
    case ORDERS_WS_MESSAGE:
      return {
        ...state,
        feedConnected: true,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    case ORDERS_WS_CLOSE:
      return {
        ...state,
        feedConnected: false,
      };
    default:
      return state;

  }
}