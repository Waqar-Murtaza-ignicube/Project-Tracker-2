import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getTimesheetApi = createApi({
  reducerPath: "getTimesheetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getTimesheet: builder.query({
      query: (token) => ({
        url: "timesheet/",
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    }),
    postTimesheetApi: builder.mutation({
      query: (data) => ({
        url: "timesheet/",
        method: "POST",
        body: data.time,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteTimesheetApi: builder.mutation({
      query: (data) => ({
        url: `timesheet/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetTimesheetQuery,
  usePostTimesheetApiMutation,
  useDeleteTimesheetApiMutation,
} = getTimesheetApi;
