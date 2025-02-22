import HttpError from "../helpers/HttpError.js";
import authService from "../services/authService.js";

export const registerUserController = async (req, res) => {
  const userData = await authService.registerUser(req.body);

  res.status(201).json({
    user: { email: userData.email, subscription: userData.subscription },
  });
};

export const loginUserController = async (req, res) => {
  const userData = await authService.loginUser(req.body);

  res.status(200).json({
    token: userData.token,
    user: { email: userData.email, subscription: userData.subscription },
  });
};

export const logoutUserController = async (req, res) => {
  await authService.logoutUser(req.user.id);

  res.status(204).send();
};

export const getCurrentUserController = async (req, res) => {};

export const updateSubscriptionUserController = async (req, res) => {};
