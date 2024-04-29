import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessToken } from "../../../interfaces/globalInterfaces";
import { DeleteProjectRequest, PostProjectRequest, UpdateProjectRequest } from "./projectApiInterface";

export const getProjectApi = createApi({
  reducerPath: "getProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getProject: builder.query<any, AccessToken>({
      query: (token) => ({
        url: "projects/",
        method: "GET",
        headers: {
          Authorization: `Token ${token.token}`,
        },
      }),
    }),
    postProjectApi: builder.mutation<any, PostProjectRequest>({
      query: (data) => ({
        url: "projects/",
        method: "POST",
        body: data.project,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteProjectApi: builder.mutation<any, DeleteProjectRequest>({
      query: (data) => ({
        url: `projects/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    updateProjectApi: builder.mutation<any, UpdateProjectRequest>({
      query: (data) => ({
        url: `projects/${data.id}/`,
        method: "PUT",
        body: data.project,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetProjectQuery,
  useDeleteProjectApiMutation,
  usePostProjectApiMutation,
  useUpdateProjectApiMutation,
} = getProjectApi;
