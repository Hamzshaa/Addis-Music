import styled from "styled-components";
import propTypes from "prop-types";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";

export default function SongCard({
  song,
  islast,
  title,
  artist,
  playSong,
  id,
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  let audioElement = null;

  const togglePlayPause = () => {
    if (audioElement && !audioElement.paused) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      if (!audioElement) {
        audioElement = new Audio(`./${song}`);
        audioElement.addEventListener("ended", () => {
          setIsPlaying(false);
        });
      }
      audioElement.play();
      setIsPlaying(true);
    }
  };
  return (
    <SongCardWrapper>
      <CardContainer>
        <ImgWrapper>
          <img src="../assets/music-disc.png" alt="" />
        </ImgWrapper>
        <Info>
          <Title>{title}</Title>
          <Artist>{artist}</Artist>
        </Info>

        <PlayButton onClick={() => playSong(song)}>
          <FaPlay />
        </PlayButton>
      </CardContainer>
      <Divider islast={islast} />
    </SongCardWrapper>
  );
}

const SongCardWrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin-inline: auto;
  background: linear-gradient(170deg, #f2f1f128, #fdfdfd, #bb63f260);
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  align-items: center;
  /* border-bottom: ${({ isLast }) =>
    isLast ? "none" : "1px solid #d1d0d0"}; */
  /* margin: 1rem; */
`;

const ImgWrapper = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
`;

const Info = styled.div`
  flex: 1;
`;

const Title = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: #333;
`;

const Artist = styled.p`
  font-size: 1.2rem;
  font-weight: 200;
  color: #414141;
  margin-bottom: -1.5rem;
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
`;

const Divider = styled.div`
  width: 90%;
  height: 2px;
  /* background: linear-gradient(to right, #88888ዝ8, #ac2efb); */
  background: linear-gradient(to right, #a318f9, #c2b4c0);
  margin-inline: 10% 0%;
  display: ${({ islast }) => (islast ? "none" : "block")};
`;

// props validation

SongCard.propTypes = {
  islast: propTypes.bool,
  title: propTypes.string,
  artist: propTypes.string,
  img: propTypes.string,
  song: propTypes.string,
  id: propTypes.string,
  playSong: propTypes.func,
};
