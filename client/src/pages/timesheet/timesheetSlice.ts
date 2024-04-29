import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: "",
  date: "",
  time_spent: "",
};

const timesheetSlice = createSlice({
  name: "timesheet",
  initialState,
  reducers: {
    addTimesheet: (state, action) => {
      return action.payload;
    },
    resetTimesheet: (state) => {
      return initialState;
    },
  },
});

export const { addTimesheet, resetTimesheet } = timesheetSlice.actions;
export default timesheetSlice.reducer;
