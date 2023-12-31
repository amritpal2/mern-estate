import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 13);
  const newUser = new User({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("user created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });
    if (!userEmail) return next(errorHandler(404, "User don't exist"));
    const validPass = bcryptjs.compareSync(password, userEmail.password);
    if (!validPass) return next(errorHandler("Wrong password"));
    const token = jwt.sign({ id: userEmail._id }, process.env.JWT_SECRET);
    const {password:pass, ...userInfo} = userEmail._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expire: new Date(Date.now) + 5 * 60 * 1000,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};
