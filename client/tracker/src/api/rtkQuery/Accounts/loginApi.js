import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    postloginCredentials: builder.mutation({
      query: (loginCreds) => ({
        url: "login/",
        method: "POST",
        body: loginCreds,
      }),
    }),
  }),
});

export const { usePostloginCredentialsMutation } = loginApi;
