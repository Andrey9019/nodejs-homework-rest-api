import multer from "multer";
import path from "path";

import { HttpError } from "../helpers/index.js";

const storage = multer.diskStorage({
  destination: path.resolve("temp"),
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, callback) => {
  const extention = file.originalname.split(".").pop();
  if (extention === "exe") {
    callback(HttpError(401, "Cannot save file with .exe extension"));
  }
  callback(null, true);
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
