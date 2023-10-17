import {checkResponse} from './checkres'

const baseUrl = 'https://norma.nomoreparties.space/api';

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