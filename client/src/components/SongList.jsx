import styled from "styled-components";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function SongList() {
  const { songs, isLoading, error } = useSelector((state) => state.songs); // eslint-disable-line
  const [audioElement, setAudioElement] = useState(null);

  const playSong = async (song) => {
    if (audioElement && !audioElement.paused) {
      audioElement.pause();
      console.log("paused");
    } else {
      if (!audioElement) {
        console.log("Played");
        const newAudioElement = await new Audio(`./${song}`);
        setAudioElement(newAudioElement);

        audioElement?.addEventListener("ended", (err) => {
          if (err) console.log("Error playing song", err);
        });
      }

      audioElement?.play();
    }
  };

  return (
    <SongListContainer>
      {songs &&
        songs?.map((song) => (
          <SongCard
            key={song._id}
            id={song._id}
            title={song.title}
            artist={song.artist}
            img={song.strAlbumThumb}
            song={song.song}
            playSong={playSong}
            islast={songs[songs.length - 1] === song}
          />
        ))}
    </SongListContainer>
  );
}

const SongListContainer = styled.div`
  padding: 3rem 0;
`;
