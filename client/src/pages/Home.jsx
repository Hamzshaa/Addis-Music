import styled from "styled-components";
import SongList from "../components/SongList";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <SongList />
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
`;
