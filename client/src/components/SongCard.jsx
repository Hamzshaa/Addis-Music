import styled from "styled-components";
import propTypes from "prop-types";
import { FaPause, FaPlay } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SongCard({
  index,
  islast,
  title,
  artist,
  currentSongIndex,
  setCurrentSongIndex,
  isPlaying,
  setIsPlaying,
  id,
}) {
  const [isCardPlaying, setIsCardPlaying] = useState(false);

  useEffect(() => {
    setIsCardPlaying(currentSongIndex == index);
  }, [currentSongIndex, index]);

  const play = () => {
    setCurrentSongIndex(index);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handlePlayPause = () => {
    setIsCardPlaying(!isPlaying);
    setIsPlaying(!isPlaying);
  };

  return (
    <SongCardWrapper isCardPlaying={isCardPlaying}>
      <CardContainer>
        <ImgWrapper className="rotate" isPlaying={isCardPlaying}>
          <img src="music-disc.png" alt="" />
        </ImgWrapper>
        <Info>
          <Title>
            <Link to={`/edit/${id}`}>{title}</Link>
          </Title>
          <Artist>{artist}</Artist>
        </Info>

        <PlayButton onClick={() => play()}>
          {isCardPlaying && isPlaying ? (
            <FaPause onClick={handlePlayPause} />
          ) : (
            <FaPlay onClick={handlePlayPause} />
          )}
        </PlayButton>
      </CardContainer>
      <Divider islast={islast} />
    </SongCardWrapper>
  );
}

const SongCardWrapper = styled.div`
  box-sizing: border-box;
  max-width: 800px;
  width: 96%;
  margin-inline: auto;
  padding-inline: 2%;
  background: ${({ isCardPlaying }) =>
    isCardPlaying
      ? "linear-gradient(181deg, #40245167, #f8f8f8, #4024513a)"
      : "linear-gradient(90deg, #f2f1f128, #fdfdfd, #dbb0f50)"};

  @media (max-width: 568px) {
  }
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
`;

const ImgWrapper = styled.div`
  width: 100px;
  height: 80px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;

    @keyframes rotateAnim {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
    animation: ${({ isPlaying }) =>
      isPlaying ? `rotateAnim 4s infinite linear` : ""};
  }

  @media (max-width: 568px) {
    width: 70px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin-top: -1.5rem;

  a {
    color: #333;
    text-decoration: none;
  }

  @media (max-width: 568px) {
    font-size: 1rem;
  }
`;

const Artist = styled.p`
  font-size: 1.2rem;
  font-weight: 200;
  color: #414141;
  margin-bottom: -1.5rem;

  @media (max-width: 568px) {
    font-size: 0.8rem;
  }
`;

const PlayButton = styled.div`
  background: #ac2efb;
  color: white;
  border-radius: 50%;
  padding: 1rem;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #6f2f9e;
  }

  @media (max-width: 568px) {
    padding: 0.5rem;
    margin-right: 1rem;
    font-size: 0.8rem;
  }
`;

const Divider = styled.div`
  width: 90%;
  height: 2px;
  /* background: linear-gradient(to right, #88888ዝ8, #ac2efb); */
  background: linear-gradient(to right, #a318f9, #c2b4c0);
  margin-inline: 10% 0%;
  display: ${({ islast }) => (islast ? "none" : "block")};
`;

SongCard.propTypes = {
  index: propTypes.number,
  islast: propTypes.bool,
  id: propTypes.string,
  title: propTypes.string,
  artist: propTypes.string,
  currentSongIndex: propTypes.number,
  setCurrentSongIndex: propTypes.func,
  isPlaying: propTypes.bool,
  setIsPlaying: propTypes.func,
};
