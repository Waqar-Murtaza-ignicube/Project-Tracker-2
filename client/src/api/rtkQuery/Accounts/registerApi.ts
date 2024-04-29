import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RegisterCreds } from "../../../pages/accounts/Register/registerInterface";

export const registerApi = createApi({
  reducerPath: "registerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    postRegisterCredentials: builder.mutation<any, RegisterCreds>({
      query: (registerCreds) => ({
        url: "register/",
        method: "POST",
        body: registerCreds,
      }),
    }),
  }),
});

export const { usePostRegisterCredentialsMutation } = registerApi;
