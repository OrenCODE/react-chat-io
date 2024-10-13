import {apiSlice} from "../slices/apiSlice.ts";
import {Payment} from "../../utils/sliceHelpers.ts";

const URL = '/payments';

export const paymentsEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPayments: builder.query<{ payments: Payment[] }, void>({
      query: () => `${URL}`,
      providesTags: ['Payment'],
    }),
    createPayment: builder.mutation<Payment, Payment>({
      query: (data) => ({
        url: URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Payment'],
    }),
    deletePaymentById: builder.mutation<Payment, string>({
      query: (id) => ({
        url: `${URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
})

export const {
  useGetPaymentsQuery,
  useCreatePaymentMutation,
  useDeletePaymentByIdMutation,
} = paymentsEndpoints;
