import { SET_INGREDIENT_DETAILS, CLEAR_INGREDIENT_DETAILS, TIngredienDetailsAction } from "../action/ingredient-details";

type TIngredienDetailsState = {
  details: {
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    name: number,
    image_large: string,
  } | null
}

const initialState: TIngredienDetailsState = {
  details: null,
};

export function ingredientDetailsReducer(state = initialState, action: TIngredienDetailsAction): TIngredienDetailsState {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return {
        details: action.details,
      };
    case
      CLEAR_INGREDIENT_DETAILS:
      return {
        details: null,
      };
    default: {
      return state;
    }
  }
}