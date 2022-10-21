import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.config";
import { clientSideError } from "./errorHandler";

const authMiddleware = async (req, res, next) => {
  try {
    const userToken = req.headers.authentication;

    if (!userToken) {
      throw new clientSideError("There is no user token");
    }

    req.currentUserId = jwt.verify(userToken, SECRET_KEY).userId;

    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
