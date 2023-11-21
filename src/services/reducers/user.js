import { SET_USER, SET_AUTH_CHECKED, CLEAR_USER } from "../action/user";

const initialState = {
  isAuthChecked: false,
  user: null
};

export const getUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    default: {
      return state;
    }
  }
}