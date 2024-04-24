import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminAuth = createApi({
  reducerPath: "adminAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getAuthenticated: builder.query({
      query: (token) => ({
        url: "company/",
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
  }),
});

export const { useGetAuthenticatedQuery } = adminAuth;
