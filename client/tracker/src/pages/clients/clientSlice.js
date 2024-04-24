import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client_name: "",
  client_contact: "",
  client_status: "active",
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    addClient: (state, action) => {
      return action.payload
    },
    resetClient: (state, action) => {
        return initialState;
    }
  },
});

export const { addClient, resetClient } = clientSlice.actions;
export default clientSlice.reducer;
