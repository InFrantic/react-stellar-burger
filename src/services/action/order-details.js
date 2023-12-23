import {getOrder} from "../../utils/api";

export const GET_ORDER_LOADING = 'GET_ORDER_LOADING';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER_FAILED';

export function orderDetailsLoading() {
  return {type: GET_ORDER_LOADING};
}

export function orderDetailsSuccess(orderNumber) {
  return {type: GET_ORDER_SUCCESS, payload: orderNumber};
}

export function orderDetailsFailed() {
  return {type: GET_ORDER_FAILED};
}

export function clearOrderDetails() {
  return {type: CLEAR_ORDER};
}

export function getOrderDetails(ingredientsOrder) {
  return function (dispatch) {
    dispatch(orderDetailsLoading());
    getOrder(ingredientsOrder)
      .then(res => {
          dispatch(orderDetailsSuccess(res.order.number));
      })
      .catch(() => {
        dispatch(orderDetailsFailed());
      })
  };
}