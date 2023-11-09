import { baseUrl } from "../../utils/api";
import { request, refreshToken } from "../../utils/api";
import { getCookie } from "../../utils/coockie";


export const GET_USER_INFO = 'GET_USER_INFO';
export const PATCH_USER_INFO = 'PATCH_USER_INFO';

const userInfo = (payload) => ({
  type: GET_USER_INFO,
  payload
});

const newUserInfo = (payload) => ({
  type: PATCH_USER_INFO,
  payload
});

export const getUserInfo = () => {
  const url = `${baseUrl}/auth/user`;
  const options = {
    headers: {
      authorization: 'Bearer ' + getCookie('access'),
      'Content-Type': 'application/json'
    }
  };

  return (dispatch) => {
    request(url, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(userInfo(data));
        }
      })
      .catch((err) => {
        if (err) {
          refreshToken()
        }
      })
  }
}

export const setUserInfo = (email, name, password) => {
  const url = `${baseUrl}/auth/user`;
  const options = {
    method: 'PATCH',
    headers: {
      authorization: 'Bearer ' + getCookie('access'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      name,
      password
    })
  };

  return (dispatch) => {
    request(url, options)
      .then((data) => {
        const { success } = data;
        if (success) {
          dispatch(newUserInfo(data));
        }
      })
      .catch((err) => {
        if (err) {
          refreshToken()
        }
      })
  }
}