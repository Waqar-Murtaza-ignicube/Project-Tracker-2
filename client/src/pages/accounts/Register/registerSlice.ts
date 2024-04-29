import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirm_password: "",
  date_of_birth: "",
  gender: "male",
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { registerUser } = registerSlice.actions;
export default registerSlice.reducer;
