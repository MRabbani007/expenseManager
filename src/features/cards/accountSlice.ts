import { apiSlice } from "../api/apiSlice";

export const accountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => ({
        url: "/account",
        method: "GET",
      }),
      transformResponse: (response: any) => {
        const { data, count }: { data: AccountInfo[]; count: number } =
          response;
        return { data, count };
      },
      providesTags: (result) => {
        return result
          ? [
              ...result?.data.map(({ id }) => ({
                type: "account" as const,
                id,
              })),
              { type: "account", id: "AllAccounts" },
            ]
          : [{ type: "account", id: "AllAccounts" }];
      },
    }),
    addAccount: builder.mutation({
      query: (account: AccountInfo) => ({
        url: "/account",
        method: "POST",
        body: {
          account,
        },
      }),
      invalidatesTags: () => {
        return [{ type: "account", id: "AllAccounts" }];
      },
    }),
    editAccount: builder.mutation({
      query: (account: AccountInfo) => ({
        url: "/account",
        method: "PATCH",
        body: { account },
      }),
      invalidatesTags: (result, error, { id }) => {
        return [{ type: "account", id }];
      },
    }),
    deleteAccount: builder.mutation({
      query: (id: string) => ({
        url: "/account",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, id) => {
        return [{ type: "account", id }];
      },
    }),
  }),
});

export const {
  useLazyGetAccountsQuery,
  useAddAccountMutation,
  useEditAccountMutation,
  useDeleteAccountMutation,
} = accountSlice;
