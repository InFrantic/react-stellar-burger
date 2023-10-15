import {
  CHOOSE_BUN,
  CLEAR_BURGER_CONSTRUCTOR,
  DELETE_FILLING,
  ADD_FILLING,
  MOVE_FILLING
} from "../action/burger-constructor";

const initialState = {
  bun: null,
  ingredients: [],
};


export function constructorReducer(state = initialState, action) {
  switch (action.type) {
    case CHOOSE_BUN:
      return {
        ...state,
        bun: action.payload
      };
    case ADD_FILLING:
      return {
        ...state,
        ingredients: [...state.ingredients,
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
        ingredients: [...state.ingredients].filter(item => item.numberIngredient !== action.payload),
      };
    case MOVE_FILLING:
      return {
        ...state,
        ingredients: action.payload,
      };
    default: {
      return state;
    }
  }
}