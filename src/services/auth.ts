export const TOKEN_KEY = '@projeto-Token'

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) != null

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const login = (token:any) => {
    localStorage.setItem(TOKEN_KEY, token)
}
export const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
}