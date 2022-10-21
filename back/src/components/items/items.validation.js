import db from "../../models";
import {
  authorizationError,
  clientSideError,
} from "../../middlewares/errorHandler";
const Joi = require("joi");
const Item = db.item;

const itemSchema = Joi.object().keys({
  itemName: Joi.string().required(),
  itemCategory: Joi.string().required(),
  itemType: Joi.string().allow(null, ""),
  itemImage: Joi.array().allow(null, ""),
  status: Joi.string().allow(null, ""),
  itemDesc: Joi.string().allow(null, ""),
  openChat: Joi.string().uri().allow(null, ""),
});

const itemValidation = async (req, res, next) => {
  const body = req.body;
  const { error, value } = itemSchema.validate(body, { abortEarly: false });
  if (error) {
    try {
      console.log(error);
      throw new clientSideError(error.message);
    } catch (error) {
      next(error);
    }
  }
  next();
};

const itemValidationPut = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const targetItemId = req.params.itemId;

    const foundItem = await Item.findOne({
      raw: true,
      where: {
        itemId: targetItemId,
      },
    });
    if (foundItem?.userId !== currentUserId) {
      throw new authorizationError("Unauthorized");
    }

    if (!req.body.itemName) {
      req.body.itemName = foundItem.itemName;
    }

    if (!req.body.itemCategory) {
      req.body.itemCategory = foundItem.itemCategory;
    }

    const { error, value } = itemSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      console.log(error);
      throw new clientSideError(error.message);
    }
  } catch (error) {
    next(error);
  }
  next();
};

export { itemValidation, itemValidationPut };
