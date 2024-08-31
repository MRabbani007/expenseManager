import { store } from "@/app/store";
import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${store.getState()?.auth?.token}`,
        },
        credentials: "include",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/user/refresh",
        method: "GET",
        credentials: "include",
      }),
      // transformResponse: (responseData) => {
      //   console.log(responseData);
      //   return responseData;
      // },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
