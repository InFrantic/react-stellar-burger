import { baseUrl } from "../../utils/api";
import { request } from '../../utils/api';

export const GET_PASSWORD_SUCCESS = 'GET_PASSWORD_SUCCESS';

const passwordSuccess = (payload) => ({
  type: GET_PASSWORD_SUCCESS,
  payload
})

export const getPasswordSuccess = () => {
  const url = `${baseUrl}/password-reset`;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ''
    })
  };
  return (dispatch) => {
    request(url, options)
      .then(({ success, message }) => {
        
        dispatch(passwordSuccess(success));
      })
      .catch(console.warn);
  }
}