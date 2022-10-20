import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import {
  authorizationError,
  clientSideError,
} from "../../middlewares/errorHandler";
const Joi = require("joi");

const itemSchema = Joi.object().keys({
  itemName: Joi.string().required(),
  itemType: Joi.object(),
  itemImage: Joi.array(),
  itemDesc: Joi.string(),
  openChat: Joi.string().uri(),
});

const itemValidation = async (req, res, next) => {
  const body = req.body;
  const { error, value } = itemSchema.validate(body, { abortEarly: false });
  if (error) {
    try {
      console.log(error);
      throw new clientSideError("Item information is not valid");
    } catch (error) {
      next(error);
    }
  }
  next();
};

const Item = db.item;

const itemValidationPut = async (req, res, next) => {
  const body = req.body;
  const currentUserId = jwt.verify(
    req.headers.authentication,
    SECRET_KEY
  ).userId;

  const foundItem = await Item.findOne({
    raw: true,
    where: {
      itemId: body.itemId,
    },
  });

  if (foundItem.userId !== currentUserId) {
    throw new authorizationError("Unauthorized");
  }

  if (!req.body.itemName) {
    body.itemName = foundItem.itemName;
  }

  const { error, value } = itemSchema.validate(body, { abortEarly: false });

  if (error) {
    try {
      console.log(error);
      throw new clientSideError("Item information is not valid");
    } catch (error) {
      next(error);
    }
  }
  next();
};

export { itemValidation, itemValidationPut };
