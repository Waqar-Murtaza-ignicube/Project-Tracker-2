import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AccessToken } from "../../../interfaces/globalInterfaces";
import { DeleteMemberRequest, PostMemberRequest } from "./membersApiInterface";

export const getMembersApi = createApi({
  reducerPath: "getMembersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
  }),
  endpoints: (builder) => ({
    getMembers: builder.query<any, AccessToken>({
      query: (token) => ({
        url: "members/",
        method: "GET",
        headers: {
          Authorization: `Token ${token.token}`,
        },
      }),
    }),
    postMembersApi: builder.mutation<any, PostMemberRequest>({
      query: (data) => ({
        url: "members/",
        method: "POST",
        body: data.members,
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
    deleteMembersApi: builder.mutation<any, DeleteMemberRequest>({
      query: (data) => ({
        url: `members/${data.id}/`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${data.token}`,
        },
      }),
    }),
  }),
});

export const {
  useGetMembersQuery,
  useDeleteMembersApiMutation,
  usePostMembersApiMutation,
} = getMembersApi;
