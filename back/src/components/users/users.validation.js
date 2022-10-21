import db from "../../models";
import { clientSideError } from "../../middlewares/errorHandler";
const Joi = require("joi");
const User = db.user;

const userSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().allow(null, ""),
  nickname: Joi.string().required(),
  userDesc: Joi.string().allow(null, ""),
});

const userValidation = async (req, res, next) => {
  const body = req.body;
  const { error, value } = userSchema.validate(body);

  if (error) {
    try {
      console.log(error);
      throw new clientSideError(error.message);
    } catch (err) {
      next(err);
    }
  }
  next();
};

const userValidationPut = async (req, res, next) => {
  const body = req.body;

  const foundUser = await User.findOne({
    raw: true,
    where: {
      userId: req.currentUserId,
    },
  });

  req.body.email = foundUser.email;

  if (!req.body.nickname) {
    body.nickname = foundUser.nickname;
  }

  const { error, value } = userSchema.validate(body, { abortEarly: false });

  if (error) {
    try {
      throw new clientSideError(error.message);
    } catch (error) {
      next(error);
    }
  }
  next();
};

export { userValidation, userValidationPut };
