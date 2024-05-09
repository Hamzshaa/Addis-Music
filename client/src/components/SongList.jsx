import styled from "styled-components";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";

export default function SongList() {
  const { songs, isLoading, error } = useSelector((state) => state.songs); // eslint-disable-line

  console.log(songs);

  return (
    <SongListContainer>
      {songs?.mvids &&
        songs.mvids?.map((song, index) => (
          <SongCard
            key={index}
            title={song.strAlbum}
            artist={song.strArtist}
            img={song.strAlbumThumb}
            islast={songs[songs.length - 1] === song}
          />
        ))}

      <AddMusicButton>Add Music</AddMusicButton>
    </SongListContainer>
  );
}

const SongListContainer = styled.div`
  padding: 3rem 0;
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
  margin: 2rem;
  display: block;
  margin-inline: auto;
  transition: all 0.3s;
  &:hover {
    background: #ac2efb;
  }
`;
