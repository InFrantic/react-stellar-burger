import { TIngredient } from "../../utils/types";
import {GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, TIngredientsActions,} from "../action/burger-ingredients";

export type TIngredientsState = {
  isLoading: boolean,
  hasError: boolean,
  ingredients: Array<TIngredient>
}

const initialState:TIngredientsState = {
  isLoading: false,
  hasError: false,
  ingredients: [],
};

export const ingredientsReducer = (state:TIngredientsState = initialState, action:TIngredientsActions):TIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, hasError: false, ingredients: action.ingredients, isLoading: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, hasError: true, isLoading: false };
    }
    default: {
      return state;
    }
  }
};