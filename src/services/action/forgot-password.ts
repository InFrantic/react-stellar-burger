import { baseUrl } from "../../utils/api";
import { request } from '../../utils/api';

export const EMAIL = 'EMAIL';

type TEmail = {
  type: typeof EMAIL,
  payload: string
}

type Forgot = {
  "success": boolean,
  "message": "Reset email sent" | string
}

export type TForgotPasswordAction =
  | TEmail

export function email(value: string): TEmail {
  return { type: EMAIL, payload: value }
}

export const forgotPassword = (email: string): Promise<Forgot> => {
  return request(`${baseUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": email,
    })
  })
}

