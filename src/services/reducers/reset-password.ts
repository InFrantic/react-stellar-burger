import { PASSWORD, TOKEN, TResetPasswordAction } from '../action/reset-password'

type TResetPasswordState = {
  password: string,
  token: string,
}

const initialState: TResetPasswordState = {
  password: '',
  token: '',
}

export const resetPasswordReducer = (state = initialState, action: TResetPasswordAction): TResetPasswordState => {
  switch (action.type) {
    case PASSWORD: {
      return {
        ...state,
        password: action.payload
      }
    }
    case TOKEN: {
      return {
        ...state,
        token: action.payload
      }
    }
    default: {
      return state;
    }
  }
}