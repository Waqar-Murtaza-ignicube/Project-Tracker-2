import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getProjectApi = createApi({
  reducerPath: "getProjectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getProject: builder.query({
      query: (token) => ({
        url: "projects/",
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    postProjectApi: builder.mutation({
      query: (data) => ({
        url: "projects/",
        method: "POST",
        body: data.project,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteProjectApi: builder.mutation({
      query: (data) => ({
        url: `projects/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    updateProjectApi: builder.mutation({
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
