import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Payment} from "../../utils/sliceHelpers.ts";
import {paymentsEndpoints} from "../endpoints/paymentsEndpoints.ts";

interface PaymentsState {
  payments: Payment[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: PaymentsState = {
  payments: [],
  loading: false,
  error: null,
  successMessage: null,
};

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetPaymentsState: () => initialState,
  },
  extraReducers: (builder) => {
    // Handle getPayments
    builder.addMatcher(
      paymentsEndpoints.endpoints.getPayments.matchPending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    ).addMatcher(
      paymentsEndpoints.endpoints.getPayments.matchFulfilled,
      (state, action: PayloadAction<{ payments: Payment[] }>) => {
        state.payments = action.payload.payments;
        state.loading = false;
      }
    ).addMatcher(
      paymentsEndpoints.endpoints.getPayments.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Could not fetch payments';
      }
    )
    // Handle deletePaymentById
    builder.addMatcher(
      paymentsEndpoints.endpoints.deletePaymentById.matchPending,
      (state) => {
        state.loading = true;
        state.error = null;
      }
    ).addMatcher(
      paymentsEndpoints.endpoints.deletePaymentById.matchFulfilled,
      (state, action: PayloadAction<any>) => {
        state.payments = state.payments.filter((payment) => payment.id !== action.payload.id);
        state.loading = false;
      }
    ).addMatcher(
      paymentsEndpoints.endpoints.deletePaymentById.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Could not delete payment';
      }
    )
    // Handle createPayment
    // builder.addMatcher(
    //     paymentsEndpoints.endpoints.createPayment.matchPending,
    //     (state) => {
    //         state.loading = true;
    //         state.error = null;
    //     }
    // ).addMatcher(
    //     paymentsEndpoints.endpoints.createPayment.matchFulfilled,
    //     (state, action: PayloadAction<{ payment: Payment }>) => {
    //         state.payments.push(action.payload.payment);
    //         state.loading = false;
    //     }
    // ).addMatcher(
    //     paymentsEndpoints.endpoints.createPayment.matchRejected,
    //     (state, action) => {
    //         state.loading = false;
    //         state.error = action.error.message || 'Could not create payment';
    //     }
    // )
  },
});

export const {
  setSuccessMessage,
  clearSuccessMessage,
  resetPaymentsState
} = paymentsSlice.actions;

export default paymentsSlice.reducer;
