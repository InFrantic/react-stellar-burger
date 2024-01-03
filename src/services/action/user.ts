import { auth } from "../../utils/api";
import { AppThunk } from "../store";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";
export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER";

export type TUser = {
  user: {}
}

type TSetAuthChecked = {
  type: typeof SET_AUTH_CHECKED,
  payload: boolean,
};

type TSetUser = {
  type: typeof SET_USER,
  payload: TUser | null,
};

type TClearUser = {
  type: typeof CLEAR_USER,
};

export type TUserAction =
  | TSetAuthChecked
  | TSetUser
  | TClearUser

export const setAuthChecked = (value:boolean): TSetAuthChecked  => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: TUser | null): TSetUser => ({
  type: SET_USER,
  payload: user
});

export const clearUser = ():TClearUser => ({
  type: CLEAR_USER,
});


export const getUser = ():AppThunk<Promise<unknown>> => {
  return (dispatch) => {
    return auth.getUser()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const updateUser = (email: string, name: string, password: string):AppThunk => {
  return (dispatch) => {
    return auth.updateUser(email, name, password)
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const logout = ():AppThunk => {
  return (dispatch) => {
    return auth.logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUser());
      });
  };
};

export const login = (password: string, email: string):AppThunk => {
  return (dispatch) => {
    return auth.login(password, email)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(console.warn)
  };
};

export const register = (email: string, name: string, password: string):AppThunk => {
  return (dispatch) => {
    return auth.register(name, password, email)
      .then((res) => {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setUser(res.user));
        dispatch(setAuthChecked(true));
      })
      .catch(console.warn)
  };
};

export const checkUserAuth = ():AppThunk => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
}