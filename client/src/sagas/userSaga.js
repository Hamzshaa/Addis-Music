import { takeEvery, call, put } from "redux-saga/effects";
import { login } from "../actions/userActions";
import {
  userLoginRequest,
  userLoginSuccess,
  userLoginFailure,
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

export function* watchHandleLogin() {
  yield takeEvery("user/userLoginRequest", handleLogin);
}
