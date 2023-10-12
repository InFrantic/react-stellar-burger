import {checkResponse} from './checkres'

const baseUrl = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
    return fetch(`${baseUrl}/ingredients`)
        .then(checkResponse)
        .then(data => data.data)
} 
export const getOrder = (ingredients) => {
    return fetch(`${baseUrl}/orders`,{
       method: "POST",
       headers:{
        "Content-type": 'application/json'
       },
      body: JSON.stringify({
        ingredients: ingredients
      })
    })
      .then(checkResponse)
}