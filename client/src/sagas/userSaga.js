import { takeEvery, call, put } from "redux-saga/effects";
// import { login } from "../actions/userActions";
import {
  userLoginSuccess,
  userLoginFailure,
  userLogout,
} from "../reducers/userSlice";

function* handleLogin(action) {
  try {
    const credentials = action.payload;
    console.log("userSaga.js", credentials);

    const response = yield call(fetch, "/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = yield response.json();
    if (!response.ok) {
      yield put(userLoginFailure(data?.message));
      return;
    }

    yield put(userLoginSuccess(data));
  } catch (error) {
    yield put(userLoginFailure(error));
  }
}

function* handleLogout() {
  try {
    const response = yield call(fetch, "/api/auth/signout", {
      method: "POST",
    });

    if (response.ok) {
      console.log("userSaga.js", response.ok);
      yield put(userLogout());
    }
  } catch (error) {
    console.log(error.message);
  }
}

function* handleSignup(action) {} //eslint-disable-line

export function* watchHandleLogin() {
  yield takeEvery("user/userLoginRequest", handleLogin);
}

export function* watchHandleLogout() {
  yield takeEvery("user/userLogout", handleLogout);
}

export function* watchHandleSignup() {
  yield takeEvery("user/userSignupRequest", handleSignup);
}
