import { getOrder } from "../../utils/api";
import { AppThunk } from "../store";

export const GET_ORDER_LOADING = 'GET_ORDER_LOADING';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLEAR_ORDER = 'CLEAR_ORDER_FAILED';

type TGetOrderLoading = {
  type: typeof GET_ORDER_LOADING
}

type TGetOrderSuccess = {
  type: typeof GET_ORDER_SUCCESS,
  payload: number
}

type TGetOrderFailed = {
  type: typeof GET_ORDER_FAILED
}

type TGetOrderClear = {
  type: typeof CLEAR_ORDER
}

export type TOrderDetailsAction =
  | TGetOrderLoading
  | TGetOrderSuccess
  | TGetOrderFailed
  | TGetOrderClear

export function orderDetailsLoading(): TGetOrderLoading {
  return { type: GET_ORDER_LOADING };
}

export function orderDetailsSuccess(orderNumber: number): TGetOrderSuccess {
  return { type: GET_ORDER_SUCCESS, payload: orderNumber };
}

export function orderDetailsFailed(): TGetOrderFailed {
  return { type: GET_ORDER_FAILED, };
}

export function clearOrderDetails(): TGetOrderClear {
  return { type: CLEAR_ORDER };
}

export function getOrderDetails(ingredientsOrder: string): AppThunk {
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