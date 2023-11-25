import { CLEAR_ORDER, GET_ORDER_FAILED, GET_ORDER_LOADING, GET_ORDER_SUCCESS, } from "../action/order-details";

const initialState = {
  orderNumber: null,
  orderFailed: false,
  isLoading: false
};

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_LOADING: {
      return {
        ...state,
        isLoading: true,
        error: null
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.payload,
        isLoading: false
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: action.payload,
        isLoading: false
      };
    }
    case CLEAR_ORDER: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};