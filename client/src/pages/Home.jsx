import styled from "styled-components";
import SongList from "../components/SongList";
import { Link } from "react-router-dom";

import ReactPlayer from "react-player/youtube";
import { useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../actions/songActions";

export default function Home() {
  const dispatch = useDispatch();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const playerRef = useRef(null);
  const { songs, isLoading, error } = useSelector((state) => state.songs); // eslint-disable-line

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  const handleEnded = () => {
    console.log("ended");
    if (currentSongIndex < songs?.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  return (
    <div>
      <Player
        songsLength={songs.length}
        songs={songs}
        playerRef={playerRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
      />
      <ReactPlayer
        playing={isPlaying}
        url={songs[currentSongIndex]?.url}
        // loop={true}
        ref={playerRef}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{ display: "none" }}
      />
      <SongList
        songs={songs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
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
