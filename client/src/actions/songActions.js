import { createAction } from "@reduxjs/toolkit";

export const fetchSongs = createAction("user/fetchSongs");
export const signInUser = createAction("songs/fetchSongs");
export const fetchSongsSuccess = createAction("songs/fetch/success");
export const fetchSongsFailure = createAction("songs/fetch/failure");
export const selectSong = createAction("songs/select");

export const createSong = createAction("songs/create");
export const createSongSuccess = createAction("songs/create/success");
export const createSongFailure = createAction("songs/create/failure");

export const updateSong = createAction("songs/update");
export const updateSongSuccess = createAction("songs/update/success");
export const updateSongFailure = createAction("songs/update/failure");

export const deleteSong = createAction("songs/delete");
export const deleteSongSuccess = createAction("songs/delete/success");
export const deleteSongFailure = createAction("songs/delete/failure");
