import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "./actions/songActions";
import Home from "./pages/Home";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddSong from "./pages/AddSong";

function App() {
  const dispatch = useDispatch();
  const { songs, isLoading, error } = useSelector((state) => state.songs); // eslint-disable-line

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  // console.log({ songs, isLoading, error });

  if (!songs) {
    return <div>Loading songs...</div>;
  }

  return (
    <AppContainer>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/add" element={<AddSong />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;
`;

export default App;
