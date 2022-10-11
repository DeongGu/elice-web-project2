const { Joi } = require("express-validation");

export default {
  body: Joi.object({
    userId: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    nickname: Joi.string().required(),
    role: Joi.string(),
    name: Joi.string().required(),
    phoneNumber: Joi.string(),
    profileImage: Joi.string(),
    userDesc: Joi.string(),
    createdAt: Joi.string(),
  }),
};
