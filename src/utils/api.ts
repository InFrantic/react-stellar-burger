import { checkResponse } from './checkres'
import { TOrderWithNumber } from './types';

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const getOrderWithNumber = (number: string) => {
  return request<TOrderWithNumber>(`${baseUrl}/orders/${number}`);
};

export const getIngredients = () => {
  return fetch(`${baseUrl}/ingredients`)
    .then(checkResponse)

}
export const getOrder = (ingredientsOrder) => {
  return fetch(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder
    })
  })
    .then(checkResponse)
}

export function request<T>(url: string, options?: RequestInit) {
  return (fetch(url, options)
    .then(checkResponse<T>))
}

const refreshToken = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const logout = () => {
  return fetchWithRefresh(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};

const login = (email, password) => {
  return request(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
    })
  })
};

const getUser = () => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    }
  })
};

const updateUser = (email, name, password) => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  })
};

export const register = (name, password, email) => {
  return request(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      name
    })
  })
};

export const auth = {
  login,
  logout,
  updateUser,
  getUser,
  register
};