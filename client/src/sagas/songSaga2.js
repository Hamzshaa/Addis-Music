import {
  //   fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  //   createSong,
  createSongSuccess,
  createSongFailure,
  //   updateSong,
  updateSongSuccess,
  updateSongFailure,
  //   deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} from "../actions/songActions";

import { call, put, takeEvery } from "redux-saga/effects";

function* handleFetchSongs() {
  try {
    const response = yield call(() => fetch("https://api.example.com/songs"));
    if (!response.ok) {
      throw new Error(response.statusText); // Handle non-200 status codes
    }
    const data = yield response.json();
    yield put(fetchSongsSuccess(data));
  } catch (error) {
    yield put(fetchSongsFailure(error.toString()));
  }
}

function* handleCreateSong(action) {
  try {
    const response = yield call(() =>
      fetch("https://api.example.com/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      })
    );
    if (!response.ok) {
      throw new Error(response.statusText); // Handle non-200 status codes
    }
    const data = yield response.json();
    yield put(createSongSuccess(data));
  } catch (error) {
    yield put(createSongFailure(error.toString()));
  }
}

function* handleUpdateSong(action) {
  try {
    const response = yield call(() =>
      fetch(`https://api.example.com/songs/${action.payload.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      })
    );
    if (!response.ok) {
      throw new Error(response.statusText); // Handle non-200 status codes
    }
    const data = yield response.json();
    yield put(updateSongSuccess(data));
  } catch (error) {
    yield put(updateSongFailure(error.toString()));
  }
}

function* handleDeleteSong(action) {
  try {
    const response = yield call(() =>
      fetch(`https://api.example.com/songs/${action.payload}`, {
        method: "DELETE",
      })
    );
    if (!response.ok) {
      throw new Error(response.statusText); // Handle non-200 status codes
    }
    yield put(deleteSongSuccess(action.payload)); // Pass song ID for removal
  } catch (error) {
    yield put(deleteSongFailure(error.toString()));
  }
}

export function* watchFetchSongs() {
  yield takeEvery("songs/fetch", handleFetchSongs);
}

export function* watchCreateSong() {
  yield takeEvery("songs/create", handleCreateSong);
}

export function* watchUpdateSong() {
  yield takeEvery("songs/update", handleUpdateSong);
}

export function* watchDeleteSong() {
  yield takeEvery("songs/delete", handleDeleteSong);
}

export default function* rootSaga() {
  yield watchFetchSongs();
  yield watchCreateSong();
  yield watchUpdateSong();
  yield watchDeleteSong();
}
