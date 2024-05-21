import { all, fork } from "redux-saga/effects";
import {
  watchAddSong,
  watchDeleteSong,
  watchEditSong,
  watchFetchSongs,
} from "./sagas/songSaga";
import { watchHandleLogin } from "./sagas/userSaga";

const rootSaga = function* () {
  yield all([
    fork(watchFetchSongs),
    fork(watchHandleLogin),
    fork(watchDeleteSong),
    fork(watchEditSong),
    fork(watchAddSong),
  ]);
};

export default rootSaga;
