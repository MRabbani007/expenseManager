import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "@/app/store";
import { Description } from "@/types/type";

const globalsAdapter = createEntityAdapter({});

const initialState = globalsAdapter.getInitialState();

export const globalsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDescriptions: builder.query({
      query: (params) => ({
        url: "/description",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        params,
      }),
      // transformResponse: (baseQueryReturnValue, meta, arg) => {
      //   // globalsAdapter.setAll(initialState, baseQueryReturnValue);
      //   return baseQueryReturnValue;
      // },
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [
      //         ...result.map(({ id }) => ({ type: "Description" as const, id })),
      //         { type: "Description", id: "LIST" },
      //       ]
      // : [{ type: "Description", id: "LIST" }],

      // [
      //   { type: "Transaction", id: "Transaction" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
    }),
    getCategories: builder.query({
      query: (params) => ({
        url: "/category",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        params,
      }),
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/user/descriptions",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
      }),
    }),
    updateUserDescriptions: builder.mutation({
      query: (descriptions: Partial<Description>[]) => ({
        url: "/user/descriptions",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          descriptions,
        },
      }),
    }),
  }),
});

export const {
  useGetDescriptionsQuery,
  useLazyGetDescriptionsQuery,
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useLazyGetProfileQuery,
  useUpdateUserDescriptionsMutation,
} = globalsApiSlice;
