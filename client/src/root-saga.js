import { all, fork } from "redux-saga/effects";
import { watchFetchSongs } from "./sagas/songSaga";

const rootSaga = function* () {
  yield all([fork(watchFetchSongs)]);
};

export default rootSaga;
