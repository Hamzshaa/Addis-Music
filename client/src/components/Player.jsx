import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setIsPlaying, skipToNext, skipToPrev } from "../reducers/songSlice";

const Player = ({ songsLength, songs, playerRef }) => {
  const clickRef = useRef();
  const dispatch = useDispatch();
  const { isPlaying, currentSongIndex } = useSelector((state) => state.songs);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  let progress = (currentTime / duration) * 100;
  if (isNaN(progress)) progress = 0;

  console.log(currentTime, duration, progress);

  const PlayPause = () => {
    if (songs?.length > 0) {
      dispatch(setIsPlaying(!isPlaying));
    }
  };

  useEffect(() => {
    while (duration == undefined) {
      if (playerRef.current) {
        const d = playerRef.current.getDuration();
        setDuration(d);
      }
    }
  }, [currentSongIndex, playerRef, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const c = playerRef.current.getCurrentTime();
        setCurrentTime(c);
      }

      if (progress == Infinity || progress == 0) {
        const d = playerRef.current.getDuration();
        setDuration(d);
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [playerRef]);

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    if (isNaN(seconds)) {
      return "00:00:00";
    }

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <PlayerContainer className="player_container">
      <Title className="title">
        <p>{songs[currentSongIndex] ? songs[currentSongIndex].title : ""}</p>
      </Title>
      <Navigation className="navigation">
        <TimeContainer>
          <p>{formatTime(currentTime) || "00:00:00"}</p>
          <p>{formatTime(duration) || "00:00:00"}</p>
        </TimeContainer>
        <div className="navigation_wrapper" ref={clickRef}>
          <div className="seek_bar" style={{ width: `${progress}%` }}></div>
        </div>
      </Navigation>
      <Controls className="controls">
        <BsFillSkipStartCircleFill
          className="btn_action"
          onClick={() => dispatch(skipToPrev(songsLength))}
        />
        {isPlaying ? (
          <BsFillPauseCircleFill
            className="btn_action pp"
            onClick={PlayPause}
          />
        ) : (
          <BsFillPlayCircleFill className="btn_action pp" onClick={PlayPause} />
        )}
        <BsFillSkipEndCircleFill
          className="btn_action"
          onClick={() => dispatch(skipToNext(songsLength))}
        />
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

const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0 1rem 0.5rem;
`;

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
  currentTime: propTypes.number,
  duration: propTypes.number,
  songsLength: propTypes.number,
  playerRef: propTypes.object,
  songs: propTypes.array,
};
