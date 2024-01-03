import { getOrderWithNumber } from "../../utils/api";
import { TOrder } from "../../utils/types";
import { AppThunk } from "../store";

export const SET_CURRENT_ORDER = 'SET_CURRENT_INGREDIENT';
export const CLEAR_CURRENT_ORDER = 'CLEAR_CURRENT_INGREDIENT';
export const SET_CURRENT_ORDER_ERROR = "SET_CURRENT_ORDER_ERROR";

type TSetCurrentAction = {
    type: typeof SET_CURRENT_ORDER;
    payload: TOrder;
}
type TClearCurrentAction = {
    type: typeof CLEAR_CURRENT_ORDER;
}
type TSetErrorAction = {
    type: typeof SET_CURRENT_ORDER_ERROR;
    payload: string;
}

export function setCurrent(ingredient: TOrder): TSetCurrentAction {
    return {
        type: SET_CURRENT_ORDER,
        payload: ingredient
    }
}

export function clearCurrentOrder(): TClearCurrentAction {
    return {
        type: CLEAR_CURRENT_ORDER,
    }
}

export type TCurrentOrderActions =
    | TSetCurrentAction
    | TClearCurrentAction
    | TSetErrorAction;

export function setCurrentOrder(number: string): AppThunk {
    return function (dispatch) {
        getOrderWithNumber(number)
            .then(res => {
                dispatch(setCurrent(res))
            })
            .catch(error => {
                dispatch({
                    type: SET_CURRENT_ORDER_ERROR,
                    payload: error.message
                });
            })
    }
};