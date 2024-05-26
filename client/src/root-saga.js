import { all, fork } from "redux-saga/effects";
import {
  watchAddSong,
  watchDeleteSong,
  watchEditSong,
  watchFetchSongs,
  watchSelectSong,
} from "./sagas/songSaga";
import { watchHandleLogin } from "./sagas/userSaga";

const rootSaga = function* () {
  yield all([
    fork(watchHandleLogin),
    fork(watchFetchSongs),
    fork(watchDeleteSong),
    fork(watchEditSong),
    fork(watchAddSong),
    fork(watchSelectSong),
  ]);
};

export default rootSaga;
