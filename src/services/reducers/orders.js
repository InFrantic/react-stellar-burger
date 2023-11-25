import {WebsocketStatus} from "../../utils/ws";
import {
  ORDERS_WS_CONNECTING,
  ORDERS_WS_ERROR,
  ORDERS_WS_MESSAGE,
  ORDERS_WS_OPEN,
  ORDERS_WS_CLOSE
} from "../action/orders";

const initialState = {
  status: WebsocketStatus.OFFLINE,
  data: null,
  connectingError: null,
}

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_WS_CONNECTING:
      return{
        ...state,
        status: WebsocketStatus.CONNECTING,
      };
    case ORDERS_WS_OPEN:
      return{
        ...state,
        status: WebsocketStatus.ONLINE,
      };
    case ORDERS_WS_ERROR:
      return{
        ...state,
        connectingError: action.payload,
      };
    case ORDERS_WS_MESSAGE:
      return{
        ...state,
        data: action.payload,
      };
    case ORDERS_WS_CLOSE:
      return{
        ...initialState
      };
    default:
      return state;

  }
}