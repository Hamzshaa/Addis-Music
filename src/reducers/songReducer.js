import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  selectSong,
  createSong,
  createSongSuccess,
  createSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} from "../actions/songActions";

const initialState = {
  songs: [],
  isLoading: false,
  error: null,
  selectedSong: null,
};

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    [fetchSongs.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchSongsSuccess.type]: (state, action) => {
      state.isLoading = false;
      state.songs = action.payload;
    },
    [fetchSongsFailure.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [selectSong.type]: (state, action) => {
      state.selectedSong = action.payload;
    },
    [createSong.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [createSongSuccess.type]: (state, action) => {
      state.isLoading = false;
      state.songs.push(action.payload);
    },
    [createSongFailure.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateSong.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [updateSongSuccess.type]: (state, action) => {
      state.isLoading = false;
      const songIndex = state.songs.findIndex(
        (song) => song.id === action.payload.id
      );
      if (songIndex !== -1) {
        state.songs[songIndex] = action.payload;
      }
    },
    [updateSongFailure.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteSong.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [deleteSongSuccess.type]: (state, action) => {
      state.isLoading = false;
      state.songs = state.songs.filter((song) => song.id !== action.payload);
    },
    [deleteSongFailure.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default songSlice.reducer;
