import styled from "styled-components";
import SongCard from "./SongCard";
import propTypes from "prop-types";

export default function SongList({ songs }) {
  return (
    <SongListContainer>
      {songs &&
        songs?.length > 0 &&
        songs?.map((song, index) => (
          <SongCard
            key={song._id}
            index={index}
            id={song._id}
            title={song.title}
            artist={song.artist}
            islast={songs[songs.length - 1] === song}
          />
        ))}
    </SongListContainer>
  );
}

const SongListContainer = styled.div`
  padding: 3rem 0;
`;

SongList.propTypes = {
  songs: propTypes.array,
};
