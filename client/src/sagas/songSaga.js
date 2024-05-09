import { call, put, takeEvery } from "redux-saga/effects";
import { getSongsSuccess, getSongsError } from "../reducers/songSlice";

function* workFetchSongs() {
  try {
    const songs = yield call(() =>
      fetch(
        "https://www.theaudiodb.com/api/v1/json/2/mvid.php?i=112024&t=32793500"
      )
    );
    const formattedSongs = yield songs.json();
    // const formattedSongsShortened = formattedSongs.slice(0, 10);
    // yield put(getSongsSuccess(formattedSongsShortened));
    yield put(getSongsSuccess(formattedSongs));
  } catch (error) {
    yield put(getSongsError(error));
  }
}

export function* watchFetchSongs() {
  yield takeEvery("songs/fetchSongs", workFetchSongs);
}
