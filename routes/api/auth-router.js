import express from "express";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody, authenticate } from "../../middlewares/index.js";

import { userRegisterSchema, userLoginSchema } from "../../models/User.js";

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

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
