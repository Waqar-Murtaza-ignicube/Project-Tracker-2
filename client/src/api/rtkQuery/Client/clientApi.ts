import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessToken } from "../../../interfaces/globalInterfaces";
import { DeleteRequest, PostRequest, UpdateRequest } from "./clientApiInterfaces";

export const getClientsApi = createApi({
  reducerPath: "getClientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getClients: builder.query<any, AccessToken>({
      query: (token) => ({
        url: "clients/",
        method: "GET",
        headers: {
          Authorization: `Token ${token.token}`,
        },
      }), 
    }),
    postClientsApi: builder.mutation<any, PostRequest>({
      query: (data) => ({
        url: "clients/",
        method: "POST",
        body: data.client,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteClientsApi: builder.mutation<any, DeleteRequest>({
      query: (data) => ({
        url: `clients/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    updateClientsApi: builder.mutation<any, UpdateRequest>({
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
