import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "./actions/songActions";
import Home from "./pages/Home";
import styled from "styled-components";
import Navbar from "./components/Navbar";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddSong from "./pages/AddSong";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const dispatch = useDispatch();
  const { songs, isLoading, error } = useSelector((state) => state.songs); // eslint-disable-line
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  if (!songs) {
    return <div>Loading songs...</div>;
  }

  return (
    <AppContainer>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signin"
            element={currentUser ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/add" element={<AddSong />} />
          </Route>
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
