import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {
    getUserInfoFromStorage,
    handleAuthErrors,
    initialErrors,
    UserInfo,
    ValidationErrors
} from "../../utils/sliceHelpers.ts";

export type AuthState = {
    userInfo: UserInfo | null;
    authError: string | null;
    validationErrors: ValidationErrors | null;
}

const initialState: AuthState = {
    userInfo: getUserInfoFromStorage(),
    authError: null,
    validationErrors: initialErrors,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ data: UserInfo }>) => {
            state.userInfo = action.payload.data
            localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
        },
        removeCredentials: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')

        },
        setErrors: (state, action) => {
            handleAuthErrors(state, action);
        },
        clearErrors: (state) => {
            state.validationErrors = initialErrors;
            state.authError = null;
        }
    }
})

export const {
    setCredentials,
    removeCredentials,
    setErrors,
    clearErrors
} = authSlice.actions

export default authSlice.reducer

