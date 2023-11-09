import { baseUrl } from "../../utils/api";
import { request } from '../../utils/api';

export const GET_RESET_PASSWORD_SUCCESS = 'GET_RESET_PASSWORD_SUCCESS';

const resetPasswordSuccess = (payload) => ({
  type: GET_RESET_PASSWORD_SUCCESS,
  payload
})

export const getResetPasswordSuccess = () => {
  const url = `${baseUrl}/password-reset/reset`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      password: '',
      token: ''
    })
  };
  return (dispatch) => {
    request(url, options)
      .then(({ success, message }) => {
        dispatch(resetPasswordSuccess(success));
      })
      .catch(console.warn)
  }
}