import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import songReducer from "../reducers/songSlice";
import userReducer from "../reducers/userSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  songs: songReducer,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
