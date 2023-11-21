import { baseUrl } from "../../utils/api";
import { request } from '../../utils/api';

export const PASSWORD = 'PASSWORD';
export const TOKEN ="TOKEN";

export const getResetPasswordSuccess = (password, token) => {
  return request(`${baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      token,
    })
  })
}

export function password(value) {
  return {type: PASSWORD, payload: value}
}

export function token(value) {
  return {type:TOKEN, payload: value}
}