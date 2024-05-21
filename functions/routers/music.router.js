import express from "express";
import {
  addSong,
  getSongs,
  getSong,
  editSong,
  deleteSong,
} from "../controllers/music.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const route = express.Router();
route.post("/add", verifyToken, addSong);
route.delete("/delete/:songId", verifyToken, deleteSong);
route.put("/edit/:songId", verifyToken, editSong);
route.get("/:songId", verifyToken, getSong);
route.get("/", verifyToken, getSongs);

export default route;
