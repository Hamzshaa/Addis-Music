import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "./actions/songActions";

function App() {
  const dispatch = useDispatch();
  const { songs, isLoading, error } = useSelector((state) => state.songs); // Access songs from state

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  console.log({ songs, isLoading, error });

  if (!songs) {
    return <div>Loading songs...</div>;
  }

  return (
    <div>
      {songs.map((song) => (
        <div key={song.id}>
          <h2>{song.title}</h2>
          <p>{song.artist}</p>
          {console.log({ songs, isLoading, error })}
        </div>
      ))}
    </div>
  );
}

export default App;
