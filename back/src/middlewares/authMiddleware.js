import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.config";
import { clientSideError, authorizationError } from "./errorHandler";

const authMiddleware = async (req, res, next) => {
  try {
    const userToken = req.headers.authentication;

    if (!userToken) {
      throw new clientSideError("There is no user token");
    }

    const jwtDecoded = jwt.verify(userToken, SECRET_KEY);
    const userId = jwtDecoded.userId;
    req.currentUserId = userId;

    next();
  } catch (err) {
    next(err);
  }
};

export default authMiddleware;
