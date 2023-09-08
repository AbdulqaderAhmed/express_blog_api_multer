import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

export const register = expressAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fileds are required!");
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);

    const availableUsername = await User.findOne({ username });
    const availableEmail = await User.findOne({ email });

    if (availableEmail) {
      res.status(409);
      throw new Error("Email already exists!");
    } else if (availableUsername) {
      res.status(409);
      throw new Error("Username already exists!");
    } else {
      const user = await User.create({
        username,
        email,
        password: hashPassword,
      });

      if (user) {
        res.status(201).json({
          message: "Registerd successfully!",
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        });
      }
    }
  }
});

export const login = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400);
    throw new Error("All fileds are required!");
  }
  const secret = process.env.ACCESS_TOKEN_SECRET;

  const user = await User.findOne({ username });
  if (user && bcrypt.compareSync(password, user.password)) {
    const userInfo = {
      username: user.username,
      email: user.email,
      id: user.id,
    };
    const accessToken = jwt.sign(userInfo, secret, { expiresIn: "24h" });

    user.token = accessToken;

    res.status(201).json({ message: "Logged in successfully!", user });
  }
});
