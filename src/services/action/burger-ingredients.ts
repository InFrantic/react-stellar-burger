import { getIngredients } from "../../utils/api";
import { TIngredient } from "../../utils/types";
import { AppThunk } from "../store";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

type TGetIngredientsSuccess = {
  type: typeof GET_INGREDIENTS_SUCCESS,
  ingredients: Array<TIngredient>
}

type TGetIngredientsFailed = {
  type: typeof GET_INGREDIENTS_FAILED
}

type TGetIngredientsRequest = {
  type: typeof GET_INGREDIENTS_REQUEST
}

export type TIngredientsActions =
  | TGetIngredientsSuccess
  | TGetIngredientsFailed
  | TGetIngredientsRequest;

const sortedData = (data: Array<TIngredient>): Array<TIngredient> => data.sort((a: TIngredient, b: TIngredient) => a._id > b._id ? 1 : -1)

export function getIngredientsSuccess(ingredients: Array<TIngredient>): TGetIngredientsSuccess {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: sortedData(ingredients)
  }
}

export function getIngredientsFailed(): TGetIngredientsFailed {
  return {
    type: GET_INGREDIENTS_FAILED
  }
}

export function getIngredientsRequest(): TGetIngredientsRequest {
  return {
    type: GET_INGREDIENTS_REQUEST
  }
}

export function getIngred(): AppThunk {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    getIngredients()
      .then(res => {
        dispatch(getIngredientsSuccess(res.data));
      })
      .catch(() => {
        dispatch(getIngredientsFailed());
      })
  };
}