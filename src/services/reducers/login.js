import { LOGIN_USER, LOGOUT_USER } from "../action/login";

const initialState = {
  login: null,
  logout: false,
  user: null,
};

export const loginUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGOUT_USER: {
      return {
        ...state,
        login: !action.payload.success,
        logout: action.payload.success,
        user: null
      }
    }
    case LOGIN_USER: {
      return {
        ...state,
        login: action.payload.success,
        logout: !action.payload.success,
        user: action.payload.user,
      }
    }
    default: {
      return state;
    }
  }
}