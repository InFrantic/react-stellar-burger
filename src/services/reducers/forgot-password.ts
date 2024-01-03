import { EMAIL, TForgotPasswordAction } from "../action/forgot-password";

type TForgotPasswordState = {
  email: string
}

const initialState: TForgotPasswordState = {
  email: '',
}

export const forgotPasswordReducer = (state = initialState, action: TForgotPasswordAction): TForgotPasswordState => {
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