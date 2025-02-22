import express from "express";

import validateBody from "../decorators/validateBody.js";
import {
  registerLoginUserSchema,
  updateSubscriptionUserSchema,
} from "../schemas/authSchemas.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  getCurrentUserController,
  updateSubscriptionUserController,
} from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(registerLoginUserSchema),
  ctrlWrapper(registerUserController)
);

authRouter.post(
  "/login",
  validateBody(registerLoginUserSchema),
  ctrlWrapper(loginUserController)
);

authRouter.get("/logout", ctrlWrapper(logoutUserController));

authRouter.get("/current", ctrlWrapper(getCurrentUserController));

authRouter.patch(
  "/subscription",
  validateBody(updateSubscriptionUserSchema),
  ctrlWrapper(updateSubscriptionUserController)
);

export default authRouter;
