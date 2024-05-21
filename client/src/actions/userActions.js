import { createAction } from "@reduxjs/toolkit";

export const userLoginRequest = createAction("user/userLoginRequest");
export const userLoginSuccess = createAction("user/userLoginSuccess");
export const userLoginFailure = createAction("user/userLoginFailure");
export const userLogout = createAction("user/userLogout");
export const userSignupRequest = createAction("user/userSignupRequest");

export const signup = (credentials) => async (dispatch) => {
  try {
    dispatch(userSignupRequest(credentials));

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      dispatch(userLoginFailure(data.message));
      return;
    }

    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userLoginFailure(error?.error));
    console.log(error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await fetch("/api/auth/signout", {
      method: "POST",
    });

    if (response.ok) {
      dispatch(userLogout());
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(userLoginRequest(credentials));

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      dispatch(userLoginFailure(data.message));
      return;
    }

    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userLoginFailure(error.message));
  }
};
