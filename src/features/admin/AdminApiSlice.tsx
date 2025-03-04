import { apiSlice } from "../api/apiSlice";
import { store } from "@/app/store";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result?.map(({ id }) => ({
                type: "category" as const,
                id,
              })),
              { type: "category", id: "AllCategories" },
            ]
          : [{ type: "category", id: "AllCategories" }];
      },
    }),
    addCategory: builder.mutation({
      query: (category: Category) => ({
        url: "/category",
        method: "POST",
        body: {
          category,
        },
      }),
      invalidatesTags: () => {
        return [{ type: "category", id: "AllCategories" }];
      },
    }),
    editCategory: builder.mutation({
      query: (category: Category) => ({
        url: "/category",
        method: "PATCH",
        body: {
          category,
        },
      }),
      invalidatesTags: (result, error, { id }) => {
        return [
          { type: "category", id },
          { type: "category", id: "AllCategories" },
        ];
      },
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
      invalidatesTags: (_, __, id) => {
        return [
          { type: "category", id },
          { type: "category", id: "AllCategories" },
        ];
      },
    }),
    getDescriptions: builder.query<Description[], void>({
      query: () => ({
        url: "/description",
        method: "GET",
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result?.map(({ id }) => ({
                type: "description" as const,
                id,
              })),
              { type: "description", id: "AllDescriptions" },
            ]
          : [{ type: "description", id: "AllDescriptions" }];
      },
    }),
    addDescription: builder.mutation({
      query: (description: Description) => ({
        url: "/description",
        method: "POST",
        body: {
          description,
        },
      }),
      invalidatesTags: () => {
        return [{ type: "description", id: "AllDescriptions" }];
      },
    }),
    editDescription: builder.mutation({
      query: (description: Description) => ({
        url: "/description",
        method: "PATCH",
        body: {
          description,
        },
      }),
      invalidatesTags: (_, __, { id }) => {
        return [{ type: "description", id }];
      },
    }),
    deleteDescription: builder.mutation({
      query: (id: string) => ({
        url: "/description",
        method: "DELETE",
        body: {
          id,
        },
      }),
      invalidatesTags: (_, __, id) => {
        return [{ type: "description", id }];
      },
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
