import jwt from "jsonwebtoken";

import { SECRET_KEY } from "../config/env.config";

export default (req) => {
  try {
    const token = req.authentication;
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    return false;
  }
};
