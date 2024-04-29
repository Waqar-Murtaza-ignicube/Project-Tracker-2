import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: "",
  member_name: "",
  member_email: "",
  member_role: "",
};

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    addMembers: (state, action) => {
      return action.payload;
    },
  },
});

export const { addMembers } = membersSlice.actions;
export default membersSlice.reducer;
