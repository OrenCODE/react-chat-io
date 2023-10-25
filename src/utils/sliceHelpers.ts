export const getUserInfoFromStorage = (): UserInfo => {
    const userInfo: string | null = localStorage.getItem('userInfo')
    return userInfo ? JSON.parse(userInfo) : null
}

export type UserInfo = {
    id: string
    email: string
    password: string
    name: string
    subscribed: boolean
}

export type ValidationErrors = {
    email: string
    name: string,
    password: string
}

export const initialErrors: ValidationErrors = {
    email: '',
    name: '',
    password: ''
}
