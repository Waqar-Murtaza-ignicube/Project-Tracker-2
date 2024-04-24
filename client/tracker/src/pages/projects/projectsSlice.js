import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: "",
  project_name: "",
  project_deadline: "",
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addProjects: (state, action) => {
      return action.payload;
    },
    resetProjects: (state) => {
        return initialState;
    }
  },
});

export const { addProjects, resetProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
