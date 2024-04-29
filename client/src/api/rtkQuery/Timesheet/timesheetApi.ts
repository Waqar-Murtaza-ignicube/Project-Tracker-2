import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessToken } from "../../../interfaces/globalInterfaces";
import { DeleteTimesheetRequest, PostTimesheetRequest } from "./timesheetApiInterface";

export const getTimesheetApi = createApi({
  reducerPath: "getTimesheetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getTimesheet: builder.query<any, AccessToken>({
      query: (token) => ({
        url: "timesheet/",
        method: "GET",
        headers: {
          Authorization: `Token ${token.token}`,
        },
      }),
    }),
    postTimesheetApi: builder.mutation<any, PostTimesheetRequest>({
      query: (data) => ({
        url: "timesheet/",
        method: "POST",
        body: data.time,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteTimesheetApi: builder.mutation<any, DeleteTimesheetRequest>({
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
