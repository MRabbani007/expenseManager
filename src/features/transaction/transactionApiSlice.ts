import { apiSlice } from "../api/apiSlice";

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query({
      query: (params) => ({
        url: "/transaction/user/",
        method: "GET",
        params,
      }),
      transformResponse: (response: any) => {
        const { data, count }: { data: Transaction[]; count: number } =
          response;
        return { data, count };
      },
      providesTags: (result) => {
        return result
          ? [
              ...result?.data.map(({ id }) => ({
                type: "transaction" as const,
                id,
              })),
              { type: "transaction", id: "AllTransactions" },
            ]
          : [{ type: "transaction", id: "AllTransactions" }];
      },
    }),
    addTransaction: builder.mutation({
      query: (transaction: Transaction) => ({
        url: "/transaction/user",
        method: "POST",
        body: {
          transaction,
        },
      }),
      invalidatesTags: () => {
        return [{ type: "transaction", id: "AllTransactions" }];
      },
    }),
    editTransaction: builder.mutation({
      query: (transaction: Transaction) => ({
        url: "/transaction/user",
        method: "PATCH",
        body: { transaction },
      }),
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "transaction", id }];
      },
    }),
    deleteTransaction: builder.mutation({
      query: (transaction: Transaction) => ({
        url: "/transaction/user",
        method: "DELETE",
        body: { id: transaction?.id },
      }),
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "transaction", id }];
      },
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
