import { createSlice } from "@reduxjs/toolkit";

const fetchedUser = createSlice({
  name: "userDetails",
  initialState: { data: {}, searchedUser: "" },
  reducers: {
    addUser(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    setUsername(state, action) {
      state.searchedUser = action.payload;
    },
    editUserDetails(state, action) {
      const { outerKey, innerKey, value } = action.payload;
      const nestedObject = state.data[outerKey];
      nestedObject[innerKey] = value;
      state.data[outerKey] = nestedObject;
    },
  },
});

export const { addUser, setUsername, editUserDetails } = fetchedUser.actions;
export default fetchedUser;
