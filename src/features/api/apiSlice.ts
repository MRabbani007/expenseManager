import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthState, setCredentials, clearCredentials } from "../auth/authSlice";
import { BASE_URL } from "@/lib/url";
// import { RootState } from "@/app/store";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    // const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);

      return headers;
    }
  },
});

const baseQuerywithReauth = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    localStorage.removeItem("token");
    // console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/user/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const username = api.getState().auth.user;

      // store new token
      api.dispatch(
        setCredentials({ ...refreshResult.data, username } as AuthState)
      );

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(clearCredentials());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: baseQuerywithReauth,
  //fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["category", "description", "transaction", "account"],
  endpoints: () => ({}),
});
