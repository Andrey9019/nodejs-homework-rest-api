import express from "express";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody, authenticate, upload } from "../../middlewares/index.js";

import {
  userRegisterSchema,
  userLoginSchema,
  userVerifySchema,
} from "../../models/User.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmptyBody("missing fields"),
  validateBody(userRegisterSchema),
  authController.register
);

authRouter.post(
  "/login",
  isEmptyBody("missing fields"),
  validateBody(userLoginSchema),
  authController.login
);

authRouter.get("/verify/:verificationToken", authController.verify);

authRouter.post(
  "/verify",
  isEmptyBody("missing fields"),
  validateBody(userVerifySchema),
  authController.resendVerifyEmail
);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authController.updateAvatar
);

export default authRouter;
