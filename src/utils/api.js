import {checkResponse} from './checkres'
import { getCookie } from "./coockie"

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(checkResponse)
        
} 
export const getOrder = (ingredientsOrder) => {
    return fetch(`${baseUrl}/orders`,{
       method: "POST",
       headers:{
        "Content-type": 'application/json'
       },
      body: JSON.stringify({
        ingredients: ingredientsOrder
      })
    })
      .then(checkResponse)
}

export const request = async (url, options) => {
  const res = await fetch(url, options)
  return checkResponse(res)
}

export const refreshToken = () => {
  const url = `${baseUrl}/auth/token`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: getCookie('refresh')
    })
  };
  request(url, options)
    .then(data => console.log(data))
    .catch(console.warn)
}