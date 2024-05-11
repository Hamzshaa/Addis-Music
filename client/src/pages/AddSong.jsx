import { useState } from "react";

export default function AddSong() {
  const [inputs, setInputs] = useState({ title: "", artist: "", song: "" });

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const songData = new FormData();
    songData.set("title", inputs.title);
    songData.set("artist", inputs.artist);
    songData.set("song", inputs.song);

    try {
      const res = await fetch("/api/music/add", {
        method: "POST",
        body: songData,
      });

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
          <label>song</label>
          <input
            type="file"
            id="song"
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, song: e.target.files[0] }))
            }
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
