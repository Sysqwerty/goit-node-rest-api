import HttpError from "../helpers/HttpError.js";
import swaggerUI from "swagger-ui-express";
import fs from "node:fs";

import { SWAGGER_PATH } from "../constants/pathsConstants.js";

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch (err) {
    return (req, res, next) => next(HttpError(500, "Can't load swagger docs"));
  }
};
