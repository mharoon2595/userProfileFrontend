import { createSlice } from "@reduxjs/toolkit";

const repoSlice = createSlice({
  name: "repoSlice",
  initialState: {
    repoCache: {},
  },
  reducers: {
    addRepo(state, action) {
      state.repoCache = { ...state.repoCache, ...action.payload };
    },
  },
});

export const { addRepo } = repoSlice.actions;
export default repoSlice;
