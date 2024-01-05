import { TIngredient } from "../../utils/types";
import {
  CHOOSE_BUN,
  CLEAR_BURGER_CONSTRUCTOR,
  DELETE_FILLING,
  ADD_FILLING,
  MOVE_FILLING,
  TBurgerConstructorActions
} from "../action/burger-constructor";

type TBurgerConstructorState = {
  bun: null | TIngredient,
  other: Array <{numberIngredient: string, ingredient: TIngredient}>
}

const initialState: TBurgerConstructorState = {
  bun: null,
  other: [],
};


export function constructorReducer(state = initialState, action:TBurgerConstructorActions):TBurgerConstructorState {
  switch (action.type) {
    case CHOOSE_BUN:
      return {
        ...state,
        bun: action.payload
      };
    case ADD_FILLING:
      return {
        ...state,
        other: [...state.other,
        {
          numberIngredient: action.payload.numberIngredient,
          ingredient: action.payload.ingredient,
        }]
      };
    case CLEAR_BURGER_CONSTRUCTOR:
      return initialState;
    case DELETE_FILLING:
      return {
        ...state,
        other: [...state.other].filter(item => item.numberIngredient !== action.payload),
      };
    case MOVE_FILLING:
      return {
        ...state,
        other: action.payload,
      };
    default: {
      return state;
    }
  }
}