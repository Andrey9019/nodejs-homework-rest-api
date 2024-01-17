import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;
  const payload = { id };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token: token,
    user: { email: user.email, subscription: user.subscription },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: oldPath, filename } = req.file;

  const avatar = await Jimp.read(oldPath);

  avatar.resize(250, 250).write(oldPath);

  const newName = `${id}_${filename}`;
  const avatarPath = path.resolve("public", "avatars");
  const newPath = path.join(avatarPath, newName);

  fs.rename(oldPath, newPath);

  const avatarURL = path.join("avatars", newName);
  const changes = await User.findByIdAndUpdate(id, { avatarURL });

  res.json({ avatarURL: changes.avatarURL });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateAvatar: ctrlWrapper(updateAvatar),
};
