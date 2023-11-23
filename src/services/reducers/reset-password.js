import { PASSWORD, TOKEN } from '../action/reset-password'

const initialState = {
  password: '',
  token: '',
}

export const resetPasswordReducer = (state = initialState, action) => {
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