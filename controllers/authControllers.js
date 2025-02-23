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
  await s.logoutUser(req.user.id);

  res.status(204).send();
};

export const getCurrentUser = async (req, res) => {
  res
    .status(200)
    .json({ email: req.user.email, subscription: req.user.subscription });
};

export const updateSubscriptionUser = async (req, res) => {
  const userData = await s.updateSubscriptionUser({
    userId: req.user.id,
    data: req.body,
  });

  res
    .status(200)
    .json({ email: userData.email, subscription: userData.subscription });
};
