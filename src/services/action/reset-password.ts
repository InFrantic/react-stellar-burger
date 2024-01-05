import { baseUrl } from "../../utils/api";
import { request } from '../../utils/api';

export const PASSWORD = 'PASSWORD';
export const TOKEN = "TOKEN";

type TPassword = {
  type: typeof PASSWORD,
  payload: string
}

type TToken = {
  type: typeof TOKEN,
  payload: string
}

type Reset = {
  "success": true,
  "message": "Password successfully reset" | string
}

export type TResetPasswordAction =
  | TPassword
  | TToken

export const getResetPasswordSuccess = (password: string, token: string): Promise<Reset> => {
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

export function password(value: string): TPassword {
  return { type: PASSWORD, payload: value }
}

export function token(value: string): TToken {
  return { type: TOKEN, payload: value }
}