import express from "express";
import { addSong, getSongs } from "../controllers/music.controller.js";
import { verifyToken } from "../utils/verifyToken.js";
// import { signin } from "../controllers/auth.controller.js";
// import { signout } from "../controllers/auth.controller.js";

const route = express.Router();
route.post("/add", verifyToken, addSong);
route.get("/", verifyToken, getSongs);
// route.post("/signin", signin);
// route.post("/signout", signout);

export default route;
