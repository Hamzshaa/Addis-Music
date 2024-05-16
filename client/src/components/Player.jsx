import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";

const Player = ({
  isPlaying,
  setIsPlaying,
  currentSongIndex,
  setCurrentSongIndex,
  songsLength,
  songs,
  playerRef,
}) => {
  const clickRef = useRef();
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const PlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (playerRef.current) {
      const d = playerRef.current.getDuration();
      setDuration(d);
    }
  }, [currentSongIndex, playerRef]);

  useEffect(() => {
    if (playerRef.current) {
      const c = playerRef.current.getCurrentTime();
      setCurrentTime(c);
    }
  }, [currentTime, playerRef]);

  useEffect(() => {
    setProgress((currentTime / duration) * 100 || 0);
  }, [currentTime, duration]);

  const skipBack = () => {
    if (currentSongIndex === 0) {
      setCurrentSongIndex(songsLength - 1);
    } else {
      setCurrentSongIndex(currentSongIndex - 1);
    }
  };

  const skiptoNext = () => {
    if (currentSongIndex === songsLength - 1) {
      setCurrentSongIndex(0);
    } else {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  };

  return (
    <PlayerContainer className="player_container">
      <Title className="title">
        <p>{songs[currentSongIndex] ? songs[currentSongIndex].title : ""}</p>
      </Title>
      <Navigation className="navigation">
        <div className="navigation_wrapper" ref={clickRef}>
          <div className="seek_bar" style={{ width: `${progress}%` }}></div>
        </div>
      </Navigation>
      <Controls className="controls">
        <BsFillSkipStartCircleFill className="btn_action" onClick={skipBack} />
        {isPlaying ? (
          <BsFillPauseCircleFill
            className="btn_action pp"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
        )}
        <BsFillSkipEndCircleFill className="btn_action" onClick={skiptoNext} />
      </Controls>
    </PlayerContainer>
  );
};

export default Player;

const PlayerContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin-inline: auto;
  margin-top: 4rem;
  padding: 1rem;
  border-radius: 10px;
  color: rgb(218, 218, 218);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  > * {
    padding: 1rem 0;
    color: rgb(48, 48, 48);
  }

  .title {
    font-size: 1.4rem;
    font-weight: 500;
  }

  .navigation {
    width: 100%;

    .navigation_wrapper {
      min-width: 100%;
      background-color: rgba(119, 119, 119, 0.781);
      height: 5px;
      border-radius: 30px;
      cursor: pointer;

      .seek_bar {
        width: 0;
        height: 100%;
        background-color: rgb(24, 128, 3);
        border-radius: 30px;
      }
    }
  }

  .controls {
    font-size: inherit;
    display: flex;
    align-items: center;

    .btn_action {
      font-size: 2rem;
      margin: 0 1rem;
      cursor: pointer;

      &:hover {
        color: black;
      }
    }

    .pp {
      font-size: 4rem;
    }
  }
`;

const Title = styled.div``;

const Navigation = styled.div`
  .navigation_wrapper {
    min-width: 100%;
    background-color: rgba(119, 119, 119, 0.781);
    height: 5px;
    border-radius: 30px;
    cursor: pointer;

    .seek_bar {
      width: 0;
      height: 100%;
      background-color: rgb(24, 128, 3);
      border-radius: 30px;
    }
  }
`;

const Controls = styled.div`
  .btn_action {
    font-size: 2rem;
    margin: 0 1rem;
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  .pp {
    font-size: 4rem;
  }
`;

Player.propTypes = {
  isPlaying: propTypes.bool,
  setIsPlaying: propTypes.func,
  currentSongIndex: propTypes.number,
  setCurrentSongIndex: propTypes.func,
  currentTime: propTypes.number,
  duration: propTypes.number,
  songsLength: propTypes.number,
  playerRef: propTypes.object,
  songs: propTypes.array,
};
