import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessToken } from "../../../interfaces/globalInterfaces";

export const adminAuth = createApi({
  reducerPath: "adminAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getAuthenticated: builder.query<any, AccessToken>({
      query: (token) => ({
        url: "company/",
        method: "GET",
        headers: {
          Authorization: `Token ${token.token}`,
        },
      }),
    }),
  }),
});

export const { useGetAuthenticatedQuery } = adminAuth;
