import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: [],
  loggedIn: false,
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userDetails = action.payload;
    },
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state, action) {
      state.userDetails = [];
      state.loggedIn = false;
      state.token = "";
      localStorage.removeItem("_user");
      localStorage.removeItem("_token");
    },
  },
});
export const { setUser, setLoggedIn, setToken, logout } = userSlice.actions;
export default userSlice;
