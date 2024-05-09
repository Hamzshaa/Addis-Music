import { all, fork } from "redux-saga/effects"; // Import saga combinators

import handleFetchSongs from "./songSaga/handleFetchSongs"; // Path to your fetchSongs saga
import handleCreateSong from "./songSaga/handleCreateSong"; // Path to your createSong saga
import handleUpdateSong from "./songSaga/handleUpdateSong"; // Path to your updateSong saga
import handleDeleteSong from "./songSaga/handleDeleteSong"; // Path to your deleteSong saga

// ... other sagas for different functionalities (if needed)

export default function* rootSaga() {
  yield all([
    fork(handleFetchSongs),
    fork(handleCreateSong),
    fork(handleUpdateSong),
    fork(handleDeleteSong),
    // ... other saga forks (if needed)
  ]);
}
