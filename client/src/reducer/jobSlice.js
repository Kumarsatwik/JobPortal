import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobLists: [],
  skillsLists: [],
};
const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    listJob(state, action) {
      state.jobLists = action.payload;
    },
    listSkills(state, action) {
      state.skillsLists = action.payload;
    },
  },
});

export const { listJob, listSkills } = jobSlice.actions;
export default jobSlice;
