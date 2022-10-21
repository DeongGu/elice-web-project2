import { Joi } from "joi";
import { clientSideError } from "../middlewares/errorHandler";

const userSchema = Joi.object({
  userId: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  nickname: Joi.string().required(),
  profileImage: Joi.string(),
  userDesc: Joi.string(),
});

function userValidation(req, res, next) {
  const body = req.body;
  const { error, value } = userSchema.validate(body);
  if (error) throw new clientSideError("User information is not valid");
  next();
}

export default userValidation;
