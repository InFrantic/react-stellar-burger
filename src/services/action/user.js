import { auth } from "../../utils/api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";
export const CLEAR_USER = "CLEAR_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
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

export const updateUser = (email, name, password) => {
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

export const login = (password, email) => {
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

export const register = (name, password, email) => {
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