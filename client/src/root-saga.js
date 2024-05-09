import { all, fork } from "redux-saga/effects";
import { watchFetchSongs } from "./sagas/songSaga";
import { watchHandleLogin } from "./sagas/userSaga";

const rootSaga = function* () {
  yield all([fork(watchFetchSongs), fork(watchHandleLogin)]);
};

export default rootSaga;
