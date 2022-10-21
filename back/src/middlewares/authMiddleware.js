import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/env.config";
import { clientSideError, authorizationError } from "./errorHandler";

function login_required(req, res, next) {
  const token = req.authentication;

  if (!token) {
    throw new clientSideError("There is no user token");
  }

  try {
    const jwtDecoded = jwt.verify(userToken, SECRET_KEY);
    const userId = jwtDecoded.userId;
    req.currentUserId = userId;
    next();
  } catch (err) {
    throw new authorizationError(
      "Authorization filed due to invalid user token"
    );
  }
}

export { login_required };
