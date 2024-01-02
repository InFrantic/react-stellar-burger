import { v4 as uuidv4 } from 'uuid';
import { TIngredient } from '../../utils/types';

export const CHOOSE_BUN: 'CHOOSE_BUN' = 'CHOOSE_BUN';
export const ADD_FILLING: 'ADD_FILLING' = 'ADD_FILLING';
export const DELETE_FILLING: 'DELETE_FILLING' = 'DELETE_FILLING';
export const CLEAR_BURGER_CONSTRUCTOR: 'RESET_FILLING' = 'RESET_FILLING';
export const MOVE_FILLING: 'MOVE_FILLING' = 'MOVE_FILLING';

type TChooseBun = {
  type: typeof CHOOSE_BUN,
  payload: TIngredient
}

type TAddFilling = {
  type: typeof ADD_FILLING,
  payload: {
    numberIngredient: string,
    ingredient: TIngredient,
  }
}

type TDeleteFilling = {
  type: typeof DELETE_FILLING,
  payload: string
}

type TClearBurgerConstructor = {
  type: typeof CLEAR_BURGER_CONSTRUCTOR
}

type TMoveFilling = {
  type: typeof MOVE_FILLING,
  payload:  Array <{numberIngredient: string, ingredient: TIngredient}>
}

export type TBurgerConstructorActions =
  | TChooseBun
  | TAddFilling
  | TDeleteFilling
  | TClearBurgerConstructor
  | TMoveFilling;

export function chooseBun(ingredientBun: TIngredient): TChooseBun {
  return { type: CHOOSE_BUN, payload: ingredientBun }
}

export function addFilling(ingredientOther: TIngredient): TAddFilling {
  return {
    type: ADD_FILLING, payload: {
      numberIngredient: uuidv4(),
      ingredient: ingredientOther,
    }
  }
}

export function deleteFilling(idIngredientOther: string): TDeleteFilling {
  return { type: DELETE_FILLING, payload: idIngredientOther }
}

export function clearBurgerConstructor(): TClearBurgerConstructor {
  return { type: CLEAR_BURGER_CONSTRUCTOR }
}

export function moveFilling(ingredients:  Array <{numberIngredient: string, ingredient: TIngredient}>): TMoveFilling {
  return { type: MOVE_FILLING, payload: ingredients }
}