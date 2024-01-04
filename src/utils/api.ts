import { checkResponse } from './checkres'
import { TGetIngredients, TGetUser, TLogOut, TMakeOrder, TOrderWithNumber, TRefresh, TRefreshOption, TRegistration } from './types';

export const baseUrl = 'https://norma.nomoreparties.space/api';

export const getOrderWithNumber = (number: string) => {
  return request<TOrderWithNumber>(`${baseUrl}/orders/${number}`);
};

export const getIngredients = () => {
  return request<TGetIngredients>(`${baseUrl}/ingredients`)
};

export const getOrder = (ingredientsOrder: string[]) => {
  return fetchWithRefresh(`${baseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-type": 'application/json',
      Authorization: localStorage.getItem('accessToken') as string
    },
    body: JSON.stringify({
      ingredients: ingredientsOrder
    })
  }) as Promise<TMakeOrder>
};

export function request<T>(url: string, options?: RequestInit) {
  return (fetch(url, options)
    .then(checkResponse<T>))
};

export const refreshToken = () => {
  return request<TRefresh>(`${baseUrl}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken"),
    }),
  })
};

export const fetchWithRefresh = async (url: string, options: RequestInit & TRefreshOption): Promise<TGetUser | TMakeOrder> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const logout = () => {
  return request<TLogOut>(`${baseUrl}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": localStorage.getItem("refreshToken")
    }),
  })
};

export const login = (email: string, password: string) => {
  return request<TRegistration>(`${baseUrl}/auth/login`, {
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

export const getUser = () => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: String(localStorage.getItem('accessToken')),
    }
  }) as Promise<TGetUser>
};

export const updateUser = (name: string, email: string, password: string) => {
  return fetchWithRefresh(`${baseUrl}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('accessToken') as string
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  }) as Promise<TGetUser>
};

export const register = (email: string, password: string, name: string) => {
  return request<TRegistration>(`${baseUrl}/auth/register`, {
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