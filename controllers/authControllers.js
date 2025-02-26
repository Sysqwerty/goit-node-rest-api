import * as s from "../services/authService.js";

export const registerUser = async (req, res) => {
  const userData = await s.registerUser(req.body);

  res.status(201).json({
    user: { email: userData.email, subscription: userData.subscription },
  });
};

export const loginUser = async (req, res) => {
  const userData = await s.loginUser(req.body);

  res.status(200).json({
    token: userData.token,
    user: { email: userData.email, subscription: userData.subscription },
  });
};

export const logoutUser = async (req, res) => {
  const {
    user: { id: userId },
  } = req;

  await s.logoutUser(userId);

  res.status(204).send();
};

export const getCurrentUser = async (req, res) => {
  const { email, subscription, avatarURL } = req.user;

  res.status(200).json({
    email,
    subscription,
    avatarURL,
  });
};

export const updateSubscriptionUser = async (req, res) => {
  const {
    body,
    user: { id: userId },
  } = req;

  const userData = await s.updateSubscriptionUser({ userId, body });

  res
    .status(200)
    .json({ email: userData.email, subscription: userData.subscription });
};

export const updateAvatar = async (req, res) => {
  const {
    file,
    user: { id: userId },
  } = req;

  const avatarURL = await s.updateAvatar({ file, userId });

  res.status(200).json({ avatarURL: avatarURL });
};
