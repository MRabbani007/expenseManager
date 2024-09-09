// import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { store } from "@/app/store";
import { Category, Description } from "@/types/type";

// const adminAdapter = createEntityAdapter({});

// const initialState = adminAdapter.getInitialState();

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
      }),
      // transformResponse: (responseData: Category[]) => {
      //   return adminAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Transaction", id: "Transaction" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
    }),
    addCategory: builder.mutation({
      query: (category: Category) => ({
        url: "/category",
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          category,
        },
      }),
    }),
    editCategory: builder.mutation({
      query: (category: Category) => ({
        url: "/category",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          category,
        },
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id: string) => ({
        url: "/category",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          id,
        },
      }),
    }),
    getDescriptions: builder.query({
      query: () => ({
        url: "/description",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
      }),
      // transformResponse: (responseData: Category[]) => {
      //   return adminAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Transaction", id: "Transaction" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
    }),
    addDescription: builder.mutation({
      query: (description: Description) => ({
        url: "/description",
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          description,
        },
      }),
    }),
    editDescription: builder.mutation({
      query: (description: Description) => ({
        url: "/description",
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          description,
        },
      }),
    }),
    deleteDescription: builder.mutation({
      query: (id: string) => ({
        url: "/description",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        body: {
          id,
        },
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
      }),
      // transformResponse: (responseData: Category[]) => {
      //   return adminAdapter.setAll(initialState, responseData);
      // },
      // providesTags: (result, error, arg) => [
      //   { type: "Transaction", id: "Transaction" },
      //   ...result.ids.map((id) => ({ type: "Block", id })),
      // ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useGetDescriptionsQuery,
  useAddDescriptionMutation,
  useEditDescriptionMutation,
  useDeleteDescriptionMutation,
  useGetUsersQuery,
} = adminApiSlice;
