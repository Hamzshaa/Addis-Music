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
    </SongListContainer>
  );
}

const SongListContainer = styled.div`
  padding: 3rem 0;
`;
