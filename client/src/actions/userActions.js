import { createAction } from "@reduxjs/toolkit";

export const userLoginRequest = createAction("user/userLoginRequest");
export const userLoginSuccess = createAction("user/userLoginSuccess");
export const userLoginFailure = createAction("user/userLoginFailure");

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
      //   throw new Error(`Authentication failed with status ${response.status}`);
    }

    dispatch(userLoginSuccess(data));
  } catch (error) {
    dispatch(userLoginFailure(error.message));
  }
};
