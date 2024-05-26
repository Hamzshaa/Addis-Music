import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongsSuccess,
  getSongsError,
  addSongFailure,
  addSongSuccess,
  deleteSongFailure,
  deleteSongSuccess,
  selectSongSuccess,
  selectSongFailure,
} from "../reducers/songSlice";
import ReactPlayer from "react-player";

function* workFetchSongs() {
  try {
    const songs = yield call(() => fetch("api/music/"));
    const formattedSongs = yield songs.json();
    yield put(getSongsSuccess(formattedSongs));
  } catch (error) {
    yield put(getSongsError(error));
  }
}

function* workSelectSong(action) {
  try {
    const songId = action.payload;
    const song = yield call(() => fetch(`/api/music/${songId}`));
    const formattedSong = yield song.json();
    yield put(selectSongSuccess(formattedSong));
  } catch (error) {
    yield put(selectSongFailure(error.message));
  }
}

function* workAddSong(action) {
  try {
    const song = action.payload;

    const isLinkValid = ReactPlayer.canPlay(song?.url);
    if (!isLinkValid) {
      yield put(addSongFailure("Invalid YouTube URL"));
      return;
    }

    const songData = new FormData();
    songData.set("title", song?.title);
    songData.set("artist", song?.artist);
    songData.set("url", song?.url);
    const res = yield call(() =>
      fetch("/api/music/add", {
        method: "POST",
        body: songData,
      })
    );
    const data = yield res.json();
    if (!res.ok) {
      yield put(addSongFailure(data.message));
    } else {
      yield put(addSongSuccess(data));
    }
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}

function* workEditSong(action) {
  try {
    const { inputs, songId } = action.payload;
    const isLinkValid = ReactPlayer.canPlay(inputs?.url);
    if (!isLinkValid) {
      yield put(addSongFailure("Invalid YouTube URL"));
      return;
    }
    const songData = new FormData();
    songData.set("title", inputs?.title);
    songData.set("artist", inputs?.artist);
    songData.set("url", inputs?.url);
    const res = yield call(() =>
      fetch(`/api/music/edit/${songId}`, {
        method: "PUT",
        body: songData,
      })
    );
    console.log(res);
    const data = yield res.json();
    if (!res.ok) {
      yield put(addSongFailure(data.message));
    } else {
      console.log(data);
      yield put(addSongSuccess(data));
    }
  } catch (error) {
    yield put(addSongFailure(error.message));
  }
}

function* workDeleteSong(action) {
  try {
    const songId = action.payload;
    yield call(() =>
      fetch(`/api/music/delete/${songId}`, {
        method: "DELETE",
      })
    );
    yield put(deleteSongSuccess(songId));
  } catch (error) {
    yield put(deleteSongFailure(error.message));
  }
}

export function* watchFetchSongs() {
  yield takeEvery("songs/fetchSongs", workFetchSongs);
}
export function* watchSelectSong() {
  yield takeEvery("songs/selectSong", workSelectSong);
}
export function* watchAddSong() {
  yield takeEvery("songs/startAddSong", workAddSong);
}
export function* watchEditSong() {
  yield takeEvery("songs/startEditSong", workEditSong);
}
export function* watchDeleteSong() {
  yield takeEvery("songs/startDeleteSong", workDeleteSong);
}
