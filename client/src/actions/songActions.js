import { createAction } from "@reduxjs/toolkit";

export const fetchSongs = createAction("songs/fetchSongs");
export const selectedSongRequest = createAction("songs/selectSong");
export const addSongRequest = createAction("songs/startAddSong");
export const editSongRequest = createAction("songs/startEditSong");
export const deleteSongRequest = createAction("songs/startDeleteSong");
