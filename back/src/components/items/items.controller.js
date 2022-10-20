import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { Op } from "sequelize";
import {
  authorizationError,
  clientSideError,
  notFoundError,
  internalServerError,
} from "../../middlewares/errorHandler";
import { apiSuccess, creationSuccess } from "../../middlewares/successHandler";
const Item = db.item;
const Dibs = db.dibs;

export const createItem = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;

    let createInfo = { ...req.body, userId: currentUserId };

    if (req.files && req.files.length > 0) {
      let urls = new Array();
      req.files.map((file) => {
        urls.push(file.location);
      });
      createInfo["itemImage"] = urls;
    }

    if (createInfo.itemType) {
      const itemType = createInfo.itemType?.split(",");
      createInfo["itemType"] = itemType;
    }

    const createResult = await Item.create(createInfo);

    if (createResult) {
      res.send(creationSuccess(null, "Item created successfully"));
    }
  } catch (err) {
    next(err);
  }
};

export const findItem = async (req, res, next) => {
  try {
    let searchId = req.params.itemId;
    let currentUserId = null;

    if (req.headers.authentication) {
      currentUserId = jwt.verify(req.headers.authentication, SECRET_KEY).userId;
    }

    const foundItem = await Item.findOne({
      raw: true,
      where: {
        itemId: searchId,
      },
      include: {
        model: Dibs,
        as: "dibs",
        where: currentUserId ? { userId: currentUserId } : { userId: "admin" },
        attributes: ["dibsId"],
        required: false,
      },
    });

    if (!foundItem) {
      throw new notFoundError("Item information is not found");
    }

    let editable = false;

    if (currentUserId && foundItem.userId === currentUserId) {
      editable = true;
    }

    foundItem["editable"] = editable;

    res.send(apiSuccess(foundItem, "Item information found"));
  } catch (err) {
    next(err);
  }
};

export const findItems = async (req, res, next) => {
  try {
    let currentUserId = null;

    if (req.headers.authentication) {
      currentUserId = jwt.verify(req.headers.authentication, SECRET_KEY).userId;
    }

    const { status, search, limit, offset } = req.query;
    const foundItems = await Item.findAll({
      raw: true,
      where: {
        [Op.and]: [
          status ? { status: status } : null,
          search
            ? {
                [Op.or]: [
                  { itemName: { [Op.like]: `%${search}%` } },
                  { itemType: { [Op.substring]: `${search}` } },
                  { itemDesc: { [Op.like]: `%${search}%` } },
                ],
              }
            : null,
        ],
      },
      include: {
        model: Dibs,
        as: "dibs",
        where: currentUserId ? { userId: currentUserId } : { userId: "admin" },
        attributes: ["dibsId"],
        required: false,
      },
      order: [["updatedAt", "DESC"]],
      limit: Number(!limit ? 1000 : limit),
      offset: Number(!offset ? 0 : offset),
    });

    res.send(apiSuccess(foundItems, "Item search results"));
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    console.log({ body: req.body });
    let targetItemId = req.params.itemId;
    console.log("--1--");
    const updateInfo = req.body;
    console.log("--2--");
    if (req.files && req.files.length > 0) {
      let urls = new Array();
      req.files.map((file) => {
        urls.push(file.location);
      });
      updateInfo["itemImage"] = urls;
    }
    console.log("--3--");
    if (updateInfo.itemType) {
      const itemType = updateInfo.itemType?.split(",");
      updateInfo["itemType"] = itemType;
    }
    console.log("--4--");
    const updatedItem = await Item.update(updateInfo, {
      where: { itemId: targetItemId },
    });
    console.log("--5--");
    if (updatedItem) {
      res.send(apiSuccess(null, "Item information updated"));
    }
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;

    let targetItemId = req.params.itemId;

    const foundItem = await Item.findOne({
      raw: true,
      where: {
        itemId: targetItemId,
      },
    });

    if (foundItem?.userId !== currentUserId) {
      throw new authorizationError("Unauthorized");
    }

    const deletedItem = await Item.destroy({
      where: { itemId: targetItemId },
    });

    if (deletedItem) {
      res.send(apiSuccess(null, "Item information delted"));
    }
  } catch (err) {
    next(err);
  }
};
