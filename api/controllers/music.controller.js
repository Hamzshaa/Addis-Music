import { errorHandler } from "../utils/errorHandler.js";
import path from "path";
import fs from "fs";
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
      let { title, artist, url } = fields;

      title = title[0];
      artist = artist[0];
      url = url[0];

      if (!title || !artist || !url) {
        return next(errorHandler(422, "Fill in all fields."));
      }

      const music = await Music.findOne({ url: url });

      if (music && music.creator === req.user.id) {
        return next(errorHandler(409, "Music already exists"));
      }

      const newMusic = await Music.create({
        title,
        artist,
        url,
        creator: req.user.id,
      });

      if (!newMusic) {
        return next(errorHandler(400, "Error creating music"));
      }

      res.status(201).json(newMusic);
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

export const getSong = async (req, res, next) => {
  const { songId } = req.params;
  try {
    const song = await Music.findById(songId);

    if (!song) {
      return next(errorHandler(404, "Song not found"));
    }

    if (song.creator !== req.user.id) {
      return next(errorHandler(403, "Unauthorized"));
    }

    res.status(200).json(song);
  } catch (error) {
    return next(error);
  }
};

export const editSong = async (req, res, next) => {
  const { songId } = req.params;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(errorHandler(400, "Error parsing form data"));
    }
    try {
      let { title, artist, url } = fields;

      title = title[0];
      artist = artist[0];
      url = url[0];

      if (!title || !artist || !url) {
        return next(errorHandler(422, "Fill in all fields."));
      }

      const song = await Music.findById(songId);

      if (!song) {
        return next(errorHandler(404, "Song not found"));
      }

      if (song.creator !== req.user.id) {
        return next(errorHandler(403, "Unauthorized"));
      }

      const updatedSong = await Music.findByIdAndUpdate(
        songId,
        { title, artist, url },
        { new: true }
      );

      if (!updatedSong) {
        return next(errorHandler(400, "Error updating song"));
      }

      res.status(200).json(updatedSong);
    } catch (error) {
      return next(error);
    }
  });
};
