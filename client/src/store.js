import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./reducer/jobSlice";
import userSlice from "./reducer/userSlice";

const userInfo = localStorage.getItem("_user")
  ? JSON.parse(localStorage.getItem("_user"))
  : null;

const tokenInfo = localStorage.getItem("_token")
  ? localStorage.getItem("_token")
  : null;

const loggedInInfo = localStorage.getItem("_loggedIn");

const initialState = {
  user: { userDetails: userInfo, token: tokenInfo, loggedIn: loggedInInfo },
};

const store = configureStore({
  reducer: {
    jobs: jobSlice.reducer,
    user: userSlice.reducer,
  },
  preloadedState: initialState,
});

export default store;
