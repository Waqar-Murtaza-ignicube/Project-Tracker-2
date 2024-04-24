import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const memberSignupApi = createApi({
  reducerPath: "memberSignupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    postMemberCredentials: builder.mutation({
      query: (memberCreds) => ({
        url: "membersignup/",
        method: "POST",
        body: memberCreds,
      }),
    }),
  }),
});

export const { usePostMemberCredentialsMutation } = memberSignupApi;
