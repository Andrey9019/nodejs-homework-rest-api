import express from "express";

import { validateBody } from "../../decorators/index.js";

import { isEmptyBody, isValidId } from "../../middlewares/index.js";

import { userSignupSchema, userSigninSchema } from "../../models/User.js";

import authController from "../../controllers/auth-controller.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isEmptyBody("missing fields"),
  validateBody(userSignupSchema),
  authController.signup
);

export default authRouter;
