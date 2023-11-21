import { GET_USER_INFO, PATCH_USER_INFO, SET_AUTH_CHECKED } from "../action/user";

const initialState = {
  success: null,
  isAuthChecked: false,
  user: {
    email: '',
    name: ''
  },
};

export const getUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      }
    }
    case PATCH_USER_INFO: {
      return {
        ...state,
        success: action.payload.success,
        user: action.payload.user,
      }
    }
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    default: {
      return state;
    }
  }
}