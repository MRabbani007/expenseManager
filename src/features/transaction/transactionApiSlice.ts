import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { store } from "@/app/store";

const transactionAdapter = createEntityAdapter({});

const initialState = transactionAdapter.getInitialState();

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params) => ({
        url: "/transaction/user/",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        params,
      }),
      transformResponse: (responseData: Transaction[]) => {
        return transactionAdapter.setAll(initialState, responseData);
      },
      providesTags: ["transaction"],
    }),
    addTransaction: builder.mutation({
      query: (transaction: Transaction) => ({
        url: "/transaction/user",
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          transaction,
        },
      }),
      invalidatesTags: ["transaction"],
    }),
    editTransaction: builder.mutation({
      query: (transaction: Transaction) => ({
        url: "/transaction/user",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          action: {
            type: "/transaction",
            payload: {
              ...transaction,
            },
          },
        },
        invalidatesTags: ["transaction"],
      }),
    }),
    deleteTransaction: builder.mutation({
      query: (transaction: Transaction) => ({
        url: "/transaction/user",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          action: {
            type: "/transaction",
            payload: {
              ...transaction,
            },
          },
        },
      }),
      invalidatesTags: ["transaction"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useLazyGetTransactionsQuery,
  useAddTransactionMutation,
  useEditTransactionMutation,
  useDeleteTransactionMutation,
} = transactionApiSlice;
