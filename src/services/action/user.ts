import { auth } from "../../utils/api";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";
export const CLEAR_USER: "CLEAR_USER" = "CLEAR_USER";

export type TUser = {
  user: {}
}

export interface ISetUser {
  type: typeof SET_USER,
  payload: TUser | null
}

export interface IClearUser {
  type: typeof CLEAR_USER,
  payload: void
}

export interface ISetAuthChecked {
  type: typeof SET_AUTH_CHECKED,
  payload: boolean
}

export type TUserAction =
  | ISetUser
  | IClearUser
  | ISetAuthChecked

export const setAuthChecked = (payload: boolean): ISetAuthChecked => ({
  type: SET_AUTH_CHECKED,
  payload
});

export const setUser = (payload: TUser | null): ISetUser => ({
  type: SET_USER,
  payload
});

export const clearUser = () => ({
  type: CLEAR_USER,
});


export const getUser = () => {
  return (dispatch) => {
    return auth.getUser()
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const updateUser = (email: string, name: string, password: string) => {
  return (dispatch) => {
    return auth.updateUser(email, name, password)
      .then((res) => {
        dispatch(setUser(res.user));
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    return auth.logout()
      .then(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        dispatch(clearUser());
      });
  };
};

export const login = (password: string, email: string) => {
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

export const register = (email: string, name: string, password: string) => {
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

export const checkUserAuth = () => {
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