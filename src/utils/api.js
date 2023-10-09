const url = 'https://norma.nomoreparties.space/api/ingredients';

export const getIngredients = () => {
    return fetch(url)
        .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
        .then(data => data.data)
} 