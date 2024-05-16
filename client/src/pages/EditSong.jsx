import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

export default function EditSong() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", artist: "", url: "" });
  const [error, setError] = useState(null);

  const { songId } = useParams();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await fetch(`/api/music/${songId}`);
        const data = await res.json();
        setInputs(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSong();
  }, [songId]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const isLinkValid = ReactPlayer.canPlay(inputs.url);
    if (!isLinkValid) {
      setError("Invalid YouTube URL");
      return;
    }

    const songData = new FormData();
    songData.set("title", inputs.title);
    songData.set("artist", inputs.artist);
    songData.set("url", inputs.url);

    try {
      const res = await fetch(`/api/music/edit/${songId}`, {
        method: "PUT",
        body: songData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
      } else {
        setError(null);
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <EditSongContainer>
      <form onSubmit={handleSubmit}>
        {error && <Error>{error}</Error>}
        <div>
          <label>Title</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            value={inputs.title}
          />
        </div>
        <div>
          <label>Artist</label>
          <input
            type="text"
            id="artist"
            onChange={handleChange}
            value={inputs.artist}
          />
        </div>
        <div>
          <label>Song (YouTube URL)</label>
          <input
            type="text"
            id="url"
            onChange={handleChange}
            value={inputs.url}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </EditSongContainer>
  );
}

const EditSongContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 90%;
  max-width: 500px;
  margin: 0 auto;

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
