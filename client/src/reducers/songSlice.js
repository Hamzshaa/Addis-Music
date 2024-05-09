import { createSlice } from "@reduxjs/toolkit";

const songSlice = createSlice({
  name: "songs",
  initialState: {
    songs: [],
    isLoading: false,
    error: null,
    selectedSong: null,
  },
  reducers: {
    fetchSongs: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    getSongsSuccess: (state, action) => {
      state.songs = action.payload;
    },
    getSongsError: (state, action) => {
      state.error = action.payload;
      state.isLoading = true;
    },
  },
});

export const { fetchSongs, getSongsSuccess, getSongsError } =
  songSlice.actions;

export default songSlice.reducer;
