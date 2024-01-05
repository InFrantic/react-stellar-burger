import { CLEAR_ORDER, GET_ORDER_FAILED, GET_ORDER_LOADING, GET_ORDER_SUCCESS, TOrderDetailsAction, } from "../action/order-details";

type TOrderDetailsState = {
  orderNumber: string  | null,
  orderFailed: boolean,
  isLoading: boolean
}

const initialState: TOrderDetailsState = {
  orderNumber: null,
  orderFailed: false,
  isLoading: false
};

export const orderDetailsReducer = (state = initialState, action: TOrderDetailsAction): TOrderDetailsState => {
  switch (action.type) {
    case GET_ORDER_LOADING: {
      return {
        ...state,
        isLoading: true
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
        orderFailed: true,
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