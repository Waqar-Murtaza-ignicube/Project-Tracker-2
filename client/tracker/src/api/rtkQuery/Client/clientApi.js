import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getClientsApi = createApi({
  reducerPath: "getClientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getClients: builder.query({
      query: (token) => ({
        url: "clients/",
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    postClientsApi: builder.mutation({
      query: (data) => ({
        url: "clients/",
        method: "POST",
        body: data.client,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteClientsApi: builder.mutation({
      query: (data) => ({
        url: `clients/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    updateClientsApi: builder.mutation({
      query: (data) => ({
        url: `clients/${data.id}/`,
        method: "PUT",
        body: data.client,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetClientsQuery,
  useDeleteClientsApiMutation,
  usePostClientsApiMutation,
  useUpdateClientsApiMutation,
} = getClientsApi;
