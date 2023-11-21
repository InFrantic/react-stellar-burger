import { EMAIL } from "../action/forgot-password";

const initialState = {
  success: false,
  email: '',
}

export const forgotPasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case EMAIL: {
      return {
        ...state,
        email: action.payload
      }
    }
    default: {
      return state;
    }
  }
}