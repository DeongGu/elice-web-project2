const jwt = require("jsonwebtoken");
const config = require("../config/env.config.js");

function loginRequired(req, res, next) {
  const token = req.headers["Authentication"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
}

export { loginRequired };
