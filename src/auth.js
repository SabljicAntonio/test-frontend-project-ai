const KEY = 'jwt_token'

export function getToken()        { return localStorage.getItem(KEY) }
export function setToken(token)   { localStorage.setItem(KEY, token) }
export function clearToken()      { localStorage.removeItem(KEY) }
export function isAuthenticated() { return Boolean(getToken()) }
