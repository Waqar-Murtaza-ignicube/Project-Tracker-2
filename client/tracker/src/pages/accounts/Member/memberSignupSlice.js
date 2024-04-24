import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
};

const memberSignupSlice = createSlice({
  name: "membersignup",
  initialState,
  reducers: {
    memberRegister: (state, action) => {
      return action.payload;
    },
  },
});

export const { memberRegister } = memberSignupSlice.actions;
export default memberSignupSlice.reducer;
