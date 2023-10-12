const url = 'https://norma.nomoreparties.space/api';

export const getIngredients = () => {
    return fetch(`${url}/ingredients`)
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then(data => data.data)
} 
export const getOrder = (ingredients) => {
    return fetch(`${url}/orders`,{
       method: "POST",
       headers:{
        "Content-type": 'application/json'
       },
      body: JSON.stringify({
        ingredients: ingredients
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
}