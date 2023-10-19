export const getUserInfoFromStorage = () => {
    const userInfo: string | null = localStorage.getItem('userInfo')
    return userInfo ? JSON.parse(userInfo) : null
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
