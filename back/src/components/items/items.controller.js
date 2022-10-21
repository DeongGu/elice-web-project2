import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { Op } from "sequelize";
import {
  notFoundError,
  authorizationError,
} from "../../middlewares/errorHandler";
import { apiSuccess, creationSuccess } from "../../middlewares/successHandler";
const Item = db.item;
const Dibs = db.dibs;

// 상품등록
export const createItem = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    let createInfo = { ...req.body, userId: currentUserId };

    if (req.files?.length > 0) {
      let urls = new Array();
      req.files.map((file) => {
        urls.push(file.location);
      });
      createInfo["itemImage"] = urls;
    }

    if (createInfo.itemType) {
      createInfo["itemType"] = createInfo.itemType?.split(",");
    }

    const createResult = await Item.create(createInfo);

    if (createResult) {
      res.send(creationSuccess(createResult, "Item created successfully!"));
    }
  } catch (err) {
    next(err);
  }
};

// 상품조회(단건)
export const findItem = async (req, res, next) => {
  try {
    const searchId = req.params.itemId;
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
      throw new notFoundError("Item");
    }

    foundItem["editable"] = foundItem?.userId === currentUserId;

    res.send(apiSuccess(foundItem, "Item found successfully"));
  } catch (err) {
    next(err);
  }
};

// 상품목록조회(검색포함)
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
                  { itemCategory: { [Op.like]: `%${search}%` } },
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

    if (!foundItems) {
      throw new notFoundError("Items");
    }

    res.send(apiSuccess(foundItems, "Items found successfully"));
  } catch (err) {
    next(err);
  }
};

// 상품수정
export const updateItem = async (req, res, next) => {
  console.log(req.params.itemId);
  try {
    const updateInfo = req.body;

    if (req.files && req.files.length > 0) {
      let urls = new Array();
      req.files.map((file) => {
        urls.push(file.location);
      });
      updateInfo["itemImage"] = urls;
    }

    if (updateInfo.itemType) {
      const itemType = updateInfo.itemType?.split(",");
      updateInfo["itemType"] = itemType;
    }

    const updatedResult = await Item.update(updateInfo, {
      where: { itemId: req.params.itemId },
    });

    if (updatedResult) {
      res.send(apiSuccess(updatedResult, "Item is updated"));
    }
  } catch (err) {
    next(err);
  }
};

// 상품삭제
export const deleteItem = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const targetItemId = req.params.itemId;

    // 본인이 올린 상품인지 확인
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
      res.send(apiSuccess(deletedItem, "Item is deleted"));
    }
  } catch (err) {
    next(err);
  }
};
