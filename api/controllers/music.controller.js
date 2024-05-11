import { errorHandler } from "../utils/errorHandler.js";
import path from "path";
import fs from "fs";
import { v4 as uuid } from "uuid";
import formidable from "formidable";
import Music from "../models/music.model.js";
import User from "../models/auth.model.js";

export const addSong = async (req, res, next) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(errorHandler(400, "Error parsing form data"));
    }
    try {
      let { title, artist } = fields;
      title = title[0];
      artist = artist[0];
      const song = files.song;

      if (!title || !artist || !song) {
        return next(errorHandler(422, "Fill in all fields."));
      }

      if (song.size > 50000000) {
        return next(
          errorHandler(422, "Song size too big. Should be less than 50mb.")
        );
      }

      let fileType = song[0].originalFilename.split(".")[1];

      let newFilename = song[0].newFilename + "." + fileType;
      const newFilePath = path.resolve(
        process.cwd(),
        "client",
        "public",
        newFilename
      );
      fs.rename(song[0].filepath, newFilePath, async (err) => {
        if (err) {
          return next(errorHandler(400, "Error uploading song"));
        } else {
          const newMusic = await Music.create({
            title: title,
            artist: artist,
            song: newFilename,
            creator: req.user.id,
          });
          if (!newMusic) {
            return next(errorHandler(400, "Error creating music"));
          }

          res.status(201).json(newMusic);
        }
      });
    } catch (error) {
      return next(error);
    }
  });
};

export const getSongs = async (req, res, next) => {
  try {
    console.log(req.user);
    const user = User.findById(req.user.id);

    if (!user) {
      return next(errorHandler(400, "User not found"));
    }

    const songs = await Music.find({ creator: req.user.id });

    res.status(200).json(songs);
  } catch (error) {
    return next(error);
  }
};
