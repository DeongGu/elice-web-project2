const { Joi } = require("express-validation");

export default {
  register: Joi.object({
    body: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      nickname: Joi.string().required(),
      role: Joi.string(),
      name: Joi.string().required(),
      phoneNumber: Joi.string(),
      profileImage: Joi.string(),
      userDesc: Joi.string(),
    },
  }),
  login: {
    body: Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  fineAnotherUser: {
    body: Joi.object({
      userId: Joi.string().required(),
    }),
  },
  updateUser: Joi.object({
    body: {
      password: Joi.string(),
      nickname: Joi.string(),
      role: Joi.string(),
      name: Joi.string().required(),
      phoneNumber: Joi.string(),
      profileImage: Joi.string(),
      userDesc: Joi.string(),
    },
  }),
};
