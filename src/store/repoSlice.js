import { createSlice } from "@reduxjs/toolkit";

const repoSlice = createSlice({
  name: "repoSlice",
  initialState: {
    repoCache: {},
    selectedRepo: {
      image: "",
      title: "",
      description: "",
    },
  },
  reducers: {
    addRepo(state, action) {
      state.repoCache = { ...state.repoCache, ...action.payload };
    },
    addInfo(state, action) {
      const { image, title, description } = action.payload;
      state.selectedRepo.image = image;
      state.selectedRepo.title = title;
      state.selectedRepo.description = description;
    },
  },
});

export const { addRepo, addInfo } = repoSlice.actions;
export default repoSlice;
