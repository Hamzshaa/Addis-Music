import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addSongRequest } from "../actions/songActions";

export default function AddSong() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, isLoading } = useSelector((state) => state.songs);
  const [inputs, setInputs] = useState({ title: "", artist: "", url: "" });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  useEffect(() => {
    if (!isLoading && !error) {
      navigate("/");
    }
  }, [error, navigate, isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSongRequest(inputs));
  };

  return (
    <AddSongContainer>
      <h1>Add Song</h1>
      <form onSubmit={handleSubmit}>
        {error && typeof error != "object" && <Error>{error}</Error>}
        <div>
          <label>Title</label>
          <input
            type="text"
            id="title"
            autoComplete="off"
            onChange={handleChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label>Artist</label>
          <input
            type="text"
            id="artist"
            autoComplete="off"
            onChange={handleChange}
            value={inputs.artist}
          />
        </div>
        <div>
          <label>Song (YouTube URL)</label>
          <input
            type="text"
            id="url"
            autoComplete="off"
            onChange={handleChange}
            value={inputs.url}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </AddSongContainer>
  );
}

const AddSongContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

  h1 {
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;

    div {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-size: 1.2rem;
        font-weight: 500;
      }

      input {
        padding: 0.5rem;
        font-size: 1rem;
      }
    }

    button {
      padding: 0.8rem;
      font-size: 1rem;
      background-color: #bc28f2;
      border-radius: 4px;
      margin-top: 1rem;
      color: white;
      border: none;
      cursor: pointer;
    }
  }
`;

const Error = styled.p`
  background-color: #f38888ab;
  color: #9d0909;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 2rem;
  padding: 0.5rem;
  text-align: center;
`;
