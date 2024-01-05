import { TUser } from "../../utils/types";
import { SET_USER, SET_AUTH_CHECKED, CLEAR_USER, TUserAction } from "../action/user";

export type TUserDataState = {
  user: TUser | null,
  isAuthChecked: boolean,
}

const initialState:TUserDataState = {
  isAuthChecked: false,
  user: null
};

export const getUserInfoReducer = (state = initialState, action:TUserAction):TUserDataState => {
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