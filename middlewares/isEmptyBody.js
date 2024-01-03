import { HttpError } from "../helpers//index.js";

const isEmptyBody = (errorMessage) => (req, _, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, errorMessage));
  }
  next();
};

export default isEmptyBody;
