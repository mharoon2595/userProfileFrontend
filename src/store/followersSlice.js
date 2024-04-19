import { createSlice } from "@reduxjs/toolkit";

const followersSlice = createSlice({
  name: "followersSlice",
  initialState: { followers: {} },
  reducers: {
    addFollowersData(state, action) {
      state.followers = { ...state.followers, ...action.payload };
    },
  },
});

export const { addFollowersData } = followersSlice.actions;
export default followersSlice;
