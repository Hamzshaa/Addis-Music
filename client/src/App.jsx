import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "./actions/songActions";
import Home from "./pages/Home";
import styled from "styled-components";

function App() {
  const dispatch = useDispatch();
  const { songs, isLoading, error } = useSelector((state) => state.songs); // Access songs from state

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // console.log({ songs, isLoading, error });

  if (!songs) {
    return <div>Loading songs...</div>;
  }

  return (
    <AppContainer>
      <Home />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export default App;
