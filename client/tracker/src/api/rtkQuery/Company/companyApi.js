import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getCompanyApi = createApi({
  reducerPath: "getCompanyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    postCompanyApi: builder.mutation({
      query: (data) => ({
        url: "company/",
        method: "POST",
        body: data.company,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
  }),
});

export const { usePostCompanyApiMutation } = getCompanyApi;
