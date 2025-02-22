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
import auth from "../middlewares/auth.js";

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

authRouter.post("/logout", auth, ctrlWrapper(logoutUserController));

authRouter.get("/current", auth, ctrlWrapper(getCurrentUserController));

authRouter.patch(
  "/subscription",
  auth,
  validateBody(updateSubscriptionUserSchema),
  ctrlWrapper(updateSubscriptionUserController)
);

export default authRouter;
