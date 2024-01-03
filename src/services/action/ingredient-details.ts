export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

type TSetIngredientDetails = {
  type: typeof SET_INGREDIENT_DETAILS,
  details: {
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    name: number,
    image_large: string,
  }
}
type TClearIngredientDetails = {
  type: typeof CLEAR_INGREDIENT_DETAILS
}

export type TIngredienDetailsAction =
| TSetIngredientDetails
| TClearIngredientDetails

export function setIngredientDetails(proteins: number, calories: number, fat: number, carbohydrates: number, name: number, image_large: string): TSetIngredientDetails {
  return {
    type: SET_INGREDIENT_DETAILS,
    details: {
      calories,
      proteins,
      fat,
      carbohydrates,
      name,
      image_large,
    }
  }
}

export function clearIngredientDetails(): TClearIngredientDetails {
  return {
    type: CLEAR_INGREDIENT_DETAILS
  }
}