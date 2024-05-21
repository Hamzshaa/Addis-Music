import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    isLoading: false,
    error: null,
    isPlaying: false,
    currentSongIndex: 0,
  },
  reducers: {
    fetchSongs: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getSongsSuccess: (state, action) => {
      state.songs = action.payload;
      if (state.songs.length === 0) {
        state.currentSongIndex = 0;
      }
    },
    getSongsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentSongIndex: (state, action) => {
      state.currentSongIndex = action.payload;
    },
    handleEnded: (state) => {
      if (state.currentSongIndex < state.songs.length - 1) {
        state.currentSongIndex += 1;
      } else {
        state.currentSongIndex = 0;
      }
    },
    skipToNext: (state, action) => {
      if (state.currentSongIndex == action.payload - 1) {
        state.currentSongIndex = 0;
      } else {
        state.currentSongIndex += 1;
      }
    },
    skipToPrev: (state, action) => {
      if (state.currentSongIndex == 0) {
        state.currentSongIndex = action.payload - 1;
      } else {
        state.currentSongIndex -= 1;
      }
    },
    startAddSong: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    addSongSuccess: (state, action) => {
      state.songs.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    addSongFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    startEditSong: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    editSongSuccess: (state, action) => {
      const { id, title, artist, url } = action.payload;
      const song = state.songs.find((song) => song._id === id);
      song.title = title;
      song.artist = artist;
      song.url = url;
      state.isLoading = false;
      state.error = null;
    },
    editSongFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    startDeleteSong: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action) => {
      state.songs = state.songs?.filter((song) => song._id !== action.payload);
      state.isLoading = false;
      state.error = null;
      state.currentSongIndex = 0;
    },
    deleteSongFailure: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchSongs,
  getSongsSuccess,
  getSongsError,
  setIsPlaying,
  setCurrentSongIndex,
  handleEnded,
  skipToNext,
  skipToPrev,
  startAddSong,
  addSongSuccess,
  addSongFailure,
  startEditSong,
  editSongSuccess,
  editSongFailure,
  startDeleteSong,
  deleteSongSuccess,
  deleteSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
