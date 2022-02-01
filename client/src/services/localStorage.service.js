
const TOKEN_KEY = "jwt-token"
const REFRESH_KEY = "jwt-refresh-token"
const EXPIRES_KEY = "jwt-expires"
const LOCAL_ID = "localId"


export const setTokens = ({userId, refreshToken, accessToken, expiresIn=3600}) => {
    const expiresDate = new Date().getTime() + expiresIn * 1000
    localStorage.setItem(TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_KEY, refreshToken)
    localStorage.setItem(EXPIRES_KEY, expiresDate)
    localStorage.setItem(LOCAL_ID, userId)
}

export const removeTokens = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(LOCAL_ID)
}

export function getAccesToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_KEY)
}

export function getTokenExpiresDate() {
    return localStorage.getItem(EXPIRES_KEY)
}

export function getLocalId() {
    return localStorage.getItem(LOCAL_ID)
}

const localStorageService = {
    setTokens,
    getAccesToken,
    getRefreshToken,
    getTokenExpiresDate
}

export default localStorageService