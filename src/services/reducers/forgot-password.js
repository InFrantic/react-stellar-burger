import { EMAIL } from "../action/forgot-password";

const initialState = {
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