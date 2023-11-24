import { baseUrl } from "../../utils/api";
import { request } from '../../utils/api';

export const EMAIL = 'EMAIL';

export const forgotPassword = (email) => {
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

export function email(value) {
  return { type: EMAIL, payload: value }
}