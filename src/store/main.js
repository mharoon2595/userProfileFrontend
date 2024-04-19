import { configureStore } from "@reduxjs/toolkit";
import fetchedUser from "./fetchedUserSlice";
import repoSlice from "./repoSlice";
import followersSlice from "./followersSlice";

const store = configureStore({
  reducer: {
    fetchedUserData: fetchedUser.reducer,
    repoData: repoSlice.reducer,
    followers: followersSlice.reducer,
  },
});

export default store;
