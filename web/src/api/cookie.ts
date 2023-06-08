import Cookies from 'js-cookie'
// cookie保存的天数

export const TOKEN_KEY = 'NOW_TOKEN'
export const TOKEN_ADMIN = 'ADMIN_TOKEN'
export const USER_ID = 'USER_ID'

export const setToken = (token : string, cookieExpires : any) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const setAdminToken = (token : string, cookieExpires : any) => {
    Cookies.set(TOKEN_ADMIN, token, { expires: cookieExpires || 1 })
}

export const setUserId = (userId : any, cookieExpires : any) => {
    Cookies.set(USER_ID, userId , { expires: cookieExpires || 1 })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    if (token) return token
    else return false
}

export const getAdminToken = () => {
    const token = Cookies.get(TOKEN_ADMIN)
    if (token) return token
    else return false
}

export const getUserId = () => {
    const userId =parseInt(Cookies.get(USER_ID),10)
    if(userId) return userId
    else return -1
}
export const delToken = () => {
    Cookies.remove(TOKEN_KEY)
    Cookies.remove(USER_ID)
}

export const delAdminToken = () => {
    Cookies.remove(TOKEN_ADMIN)
}