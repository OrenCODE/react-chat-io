import {AuthState} from "../store/slices/authSlice.ts";
import {PayloadAction} from "@reduxjs/toolkit";

export const getUserInfoFromStorage = (): UserInfo => {
  const userInfo: string | null = localStorage.getItem('userInfo')
  return userInfo ? JSON.parse(userInfo) : null
}

export const handleAuthErrors = (state: AuthState, action: PayloadAction<{
  data: { error: any, errors: ValidationErrors }
}>) => {
  const authError = action.payload.data?.error;
  const isAuthError = authError && typeof authError === 'string';
  state.authError = isAuthError ? authError : null;

  const validationErrors = action.payload.data?.errors;
  const isValidationError = validationErrors && Object.keys(validationErrors).length > 0;
  state.validationErrors = isValidationError ? validationErrors : null;
}

export type UserInfo = {
  id: string
  email: string
  password: string
  name: string
  role: UserRole
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

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MANAGER = 'manager'

}

export type Payment = {
  id: string
  amount: number
  userId: string
  createdAt: Date
  updatedAt: Date
}
