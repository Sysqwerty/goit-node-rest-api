import bcrypt from "bcryptjs";
import gravatar from "gravatar";
import path from "node:path";
import fs from "node:fs/promises";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import checkUser from "../helpers/checkUser.js";
import { avatarsDirName, avatarsDirPath } from "../constants/pathsConstants.js";
import { createToken } from "../helpers/jwt.js";

export const findUser = async (query) =>
  User.findOne({
    where: query,
  });

export const registerUser = async (body) => {
  const user = await findUser({ email: body.email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(body.password, 10);
  const avatarURL = gravatar.url(
    body.email,
    { s: "100", r: "x", d: "retro" },
    true
  );

  return User.create({ ...body, password: hashPassword, avatarURL });
};

export const loginUser = async (body) => {
  const user = await findUser({ email: body.email });

  const isValidUser = await checkUser(user, body.password);

  if (!isValidUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id, email: user.email };
  const token = createToken(payload);

  return await user.update({ token }, { returning: true });
};

export const logoutUser = async (userId) => {
  await User.update({ token: null }, { where: { id: userId } });
};

export const updateSubscriptionUser = async ({ userId, body }) => {
  const [_, [userData]] = await User.update(body, {
    where: { id: userId },
    returning: true,
  });
  return userData;
};

export const updateAvatar = async ({ file, userId }) => {
  if (!file) {
    throw HttpError(400, "No attached file");
  }

  if (file.size > 1 * 1024 * 1024) {
    await fs.unlink(file.path);
    throw HttpError(400, "File size should be less than 1mb");
  }

  const { path: temporaryName, originalname } = file;
  const uniqueOriginalFileName = `${userId}-${originalname}`;
  const fileName = path.join(avatarsDirPath, uniqueOriginalFileName);

  try {
    await fs.rename(temporaryName, fileName);
  } catch (err) {
    await fs.unlink(temporaryName);
    return HttpError(500, "Avatar upload error");
  }

  const staticAvatarPath = path.join(avatarsDirName, uniqueOriginalFileName);

  await User.update({ avatarURL: staticAvatarPath }, { where: { id: userId } });

  return staticAvatarPath;
};
