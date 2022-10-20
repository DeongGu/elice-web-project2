import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { clientSideError } from "../../middlewares/errorHandler";
const Joi = require("joi");

const userSchema = Joi.object().keys({
  // userId: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  nickname: Joi.string().required(),
  // role: Joi.string(),
  username: Joi.string().required(),
  phoneNumber: Joi.string().allow(null, ""),
  profileImage: Joi.string().allow(null, ""),
  userDesc: Joi.string().allow(null, ""),
});

const User = db.user;

const userValidation = async (req, res, next) => {
  const body = req.body;
  const { error, value } = userSchema.validate(body);

  if (error) {
    try {
      console.log(error);
      throw new clientSideError("User information is not valid");
    } catch (err) {
      next(err);
    }
  }
  next();
};

const userValidationPut = async (req, res, next) => {
  const body = req.body;
  const currentUserId = jwt.verify(
    req.headers.authentication,
    SECRET_KEY
  ).userId;

  const foundUser = await User.findOne({
    raw: true,
    where: {
      userId: currentUserId,
    },
  });

  body.email = foundUser.email;
  body.username = foundUser.username;

  if (!req.body.password) {
    body.password = foundUser.username;
  }

  if (!req.body.nickname) {
    body.nickname = foundUser.nickname;
  }

  const { error, value } = userSchema.validate(body, { abortEarly: false });

  if (error) {
    try {
      console.log(error);
      throw new clientSideError("User information is not valid");
    } catch (error) {
      next(error);
    }
  }
  next();
};

export { userValidation, userValidationPut };
