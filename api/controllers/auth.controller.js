import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";
import { errorHandler } from "../utils/errorHandler.js";

export const signup = async (req, res, next) => {
  const { email, password1, password2 } = req.body;

  if (!email || !password1 || !password2) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (password1 !== password2) {
    return next(errorHandler(400, "Passwords do not match."));
  }
  const user = await User.findOne({ email });

  if (user) {
    return next(errorHandler(400, "Email is already registered."));
  }
  console.log("SIGN UP: ", req.body);

  const hashedPassword = bcryptjs.hashSync(password1, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);

  const { password: pass, ...rest } = newUser._doc;

  try {
    await newUser.save();
    res
      .status(200)
      .cookie("addisMusicAccessToken", token, {
        httpOnly: true,
        maxAge: 2147483647,
      })
      .send(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(errorHandler(404, "User not found."));
    }

    const isPasswordValid = bcryptjs.compareSync(password, user.password);

    if (!isPasswordValid) {
      return next(errorHandler(400, "Invalid credential"));
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

    const { password: pass, ...rest } = user._doc;

    res
      .status(200)
      .cookie("addisMusicAccessToken", token, {
        httpOnly: true,
        maxAge: 2147483647,
      })
      .send(rest);
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  try {
    console.log("Sign Out called");
    res
      .clearCookie("addisMusicAccessToken")
      .status(200)
      .json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
