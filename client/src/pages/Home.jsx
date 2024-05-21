import styled from "styled-components";
import SongList from "../components/SongList";
import { Link } from "react-router-dom";

import ReactPlayer from "react-player/youtube";
import { useEffect, useRef } from "react";
import Player from "../components/Player";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../actions/songActions";
import {
  handleEnded,
  // setCurrentSongIndex,
  setIsPlaying,
} from "../reducers/songSlice";

export default function Home() {
  const dispatch = useDispatch();
  const playerRef = useRef(null);

  // eslint-disable-next-line
  const { songs, isPlaying, currentSongIndex, isLoading, error } = useSelector(
    (state) => state.songs
  );

  console.log({ songs, isPlaying, currentSongIndex, isLoading, error });

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  return (
    <div>
      <Player songsLength={songs.length} songs={songs} playerRef={playerRef} />
      <ReactPlayer
        playing={isPlaying}
        url={songs[currentSongIndex]?.url || ""}
        ref={playerRef}
        onEnded={() => dispatch(handleEnded())}
        onPlay={() => dispatch(setIsPlaying(true))}
        onPause={() => dispatch(setIsPlaying(false))}
        style={{ display: "none" }}
      />
      <SongList songs={songs} />
      <Button>
        <Link to="/add">
          <AddMusicButton>Add Music</AddMusicButton>
        </Link>
      </Button>
    </div>
  );
}

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 3rem;
`;

const AddMusicButton = styled.button`
  padding: 1rem 2rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  display: block;
  margin-inline: auto;
  transition: all 0.3s;
  &:hover {
    background: #ac2efb;
  }

  @media (max-width: 568px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`;
