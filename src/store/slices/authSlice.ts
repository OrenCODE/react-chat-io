import {createSlice} from '@reduxjs/toolkit'
import {getUserInfoFromStorage, initialErrors, ValidationErrors} from "../../utils/sliceHelpers.ts";

type AuthState = {
    userInfo: string | null;
    authError: string | null;
    validationErrors: ValidationErrors;
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
        setCredentials: (state, action) => {
            state.userInfo = action.payload.data
            localStorage.setItem('userInfo', JSON.stringify(action.payload.data))
        },
        removeCredentials: (state) => {
            state.userInfo = null
            localStorage.removeItem('userInfo')

        },
        setErrors: (state, action) => {

            const authError = action.payload.data?.error;
            const isAuthError = authError && typeof authError === 'string';
            state.authError = isAuthError ? authError : null;

            const validationErrors = action.payload.data?.errors;
            const isValidationError = validationErrors && Object.keys(validationErrors).length > 0;
            state.validationErrors = isValidationError ? validationErrors : null;
        },
        clearErrors: (state) => {
            state.validationErrors = initialErrors;
            state.authError = null;
        }
    }
})

export const {setCredentials, removeCredentials, setErrors, clearErrors} = authSlice.actions

export default authSlice.reducer

