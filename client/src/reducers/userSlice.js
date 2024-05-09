import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoginRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    userSignupRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    userLoginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    userLoginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    userLogout: (state) => {
      state.currentUser = null;
      state.error = null;
      state.isLoading = false;
    },
  },
});

export const {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} = userSlice.actions;

export default userSlice.reducer;
