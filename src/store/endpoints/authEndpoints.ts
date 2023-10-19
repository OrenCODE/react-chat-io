import { apiSlice } from '../slices/apiSlice.ts'

const URL = '/auth';

export const authEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${URL}/login`,
        method: 'POST',
        body: data
      })
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${URL}/signup`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${URL}/logout`,
        method: 'POST'
      })
    })
  })
})

export const { useLoginMutation, useLogoutMutation, useSignupMutation } = authEndpoints;
