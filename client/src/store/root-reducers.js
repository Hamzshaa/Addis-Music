import songReducer from "../reducers/songSlice";
import userReducer from "../reducers/userSlice";

const rootReducers = {
  songs: songReducer,
  user: userReducer,
};

export default rootReducers;
