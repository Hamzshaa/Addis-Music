import { call, put, takeEvery } from "redux-saga/effects";
import { getSongsSuccess, getSongsError } from "../reducers/songSlice";

function* workFetchSongs() {
  try {
    const songs = yield call(() => fetch("api/music/"));
    const formattedSongs = yield songs.json();
    yield put(getSongsSuccess(formattedSongs));
  } catch (error) {
    yield put(getSongsError(error));
  }
}

export function* watchFetchSongs() {
  yield takeEvery("songs/fetchSongs", workFetchSongs);
}
