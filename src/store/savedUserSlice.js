import { createSlice } from "@reduxjs/toolkit";

const savedUsers = createSlice({
  name: "savedUsers",
  initialState: {
    users: [],
  },
  reducers: {
    addSavedUsers(state, action) {
      state.users = [...action.payload];
    },
  },
});

export const { addSavedUsers } = savedUsers.actions;
export default savedUsers;
