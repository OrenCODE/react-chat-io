import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import usersReducer from './slices/usersSlice'
import paymentsReducer from './slices/paymentsSlice.ts'
import {apiSlice} from './slices/apiSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        payments: paymentsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

export type RootState = ReturnType<typeof store.getState>

export default store
