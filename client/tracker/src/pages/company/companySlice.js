import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company_name: "",
  company_employees: 10,
  company_type: "software company",
  country: "",
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    addCompany: (state, action) => {
      return action.payload;
    },
  },
});

export const { addCompany } = companySlice.actions;
export default companySlice.reducer;
