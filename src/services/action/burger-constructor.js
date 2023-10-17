import { v4 as uuidv4 } from 'uuid';

export const CHOOSE_BUN = 'CHOOSE_BUN';
export const ADD_FILLING = 'ADD_FILLING';
export const DELETE_FILLING = 'DELETE_FILLING';
export const CLEAR_BURGER_CONSTRUCTOR = 'RESET_FILLING';
export const MOVE_FILLING = 'MOVE_FILLING';

export function chooseBun(ingredientBun) {
  return {type: CHOOSE_BUN, payload: ingredientBun}
}

export function addFilling(ingredientOther) {
  return {
    type: ADD_FILLING, payload: {
      numberIngredient: uuidv4(),
      ingredient: ingredientOther,
    }
  }
}

export function deleteFilling(idIngredientOther) {
  return {type: DELETE_FILLING, payload: idIngredientOther}
}

export function clearBurgerConstructor() {
  return {type: CLEAR_BURGER_CONSTRUCTOR}
}

export function moveFilling(ingredients) {
  return {type: MOVE_FILLING, payload: ingredients}
}