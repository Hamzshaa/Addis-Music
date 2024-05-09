import { configureStore } from "@reduxjs/toolkit";
import songSlice from "./reducers/songReducer"; // Path to your song reducer (slice) file
import rootSaga from "./sagas"; // Path to your root saga file
import { createMiddleware } from "redux-saga"; // Import for creating saga middleware

const sagaMiddleware = createMiddleware(); // Create saga middleware instance

const store = configureStore({
  reducer: {
    songs: songSlice.reducer,
  },
  middleware: [sagaMiddleware], // Add saga middleware to the middleware array
});

sagaMiddleware.run(rootSaga); // Start the root saga using the middleware

export default store;
