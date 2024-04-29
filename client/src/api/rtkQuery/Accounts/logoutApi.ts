import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessToken } from "../../../interfaces/globalInterfaces";

export const logoutApi = createApi({
  reducerPath: "logoutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    postlogoutApi: builder.mutation<any, AccessToken>({
      query: (token) => ({
        url: "logout/",
        method: "POST",
        headers: {
          Authorization: `Token ${token.token}`,
        },
      }),
    }),
  }),
});

export const { usePostlogoutApiMutation } = logoutApi;
