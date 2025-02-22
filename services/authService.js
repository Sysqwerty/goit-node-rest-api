import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import checkUser from "../helpers/checkUser.js";

const registerUser = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = bcrypt.hashSync(data.password);

  return User.create({ ...data, password: hashPassword });
};

const loginUser = async (data) => {
  const user = await User.findOne({ where: { email: data.email } });

  const isValidUser = checkUser(user, data.password);

  if (!isValidUser) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = { id: user.id, email: user.email };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return await user.update({ token }, { returning: true });
};

const logoutUser = async (userId) => {
  await User.update({ token: null }, { where: { id: userId } });
};

const updateSubscriptionUser = async ({ userId, data }) => {
  const [_, [userData]] = await User.update(data, {
    where: { id: userId },
    returning: true,
  });
  return userData;
};

export default { registerUser, loginUser, logoutUser, updateSubscriptionUser };
