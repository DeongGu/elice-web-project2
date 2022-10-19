import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { Op } from "sequelize";
const Item = db.item;
const Dibs = db.dibs;

export const createItem = async (req, res, next) => {
  try {
    // 로그인여부 확인(미들웨어 적용예정)
    if (!req.headers.authentication) {
      return res.status(401).send({ message: "로그인 하지 않은 상태입니다." });
    }
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    // ----------

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
      res.status(201).json({ message: "Item created successfully!" });
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
      include: [
        currentUserId
          ? {
              model: Dibs,
              as: "dibs",
              where: { userId: currentUserId },
              attributes: ["dibsId"],
              required: false,
            }
          : {},
      ],
    });

    let editable = false;
    if (currentUserId && foundItem.userId === currentUserId) {
      editable = true;
    }
    foundItem["editable"] = editable;

    res.status(200).send(foundItem);
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
    console.log(currentUserId);
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
      include: [
        currentUserId
          ? {
              model: Dibs,
              as: "dibs",
              where: { userId: currentUserId },
              attributes: ["dibsId"],
              required: false,
            }
          : {},
      ],
      order: [["updatedAt", "DESC"]],
      limit: Number(!limit ? 1000 : limit),
      offset: Number(!offset ? 0 : offset),
    });
    res.status(200).send(foundItems);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    // 로그인여부 확인(미들웨어 적용예정)
    if (!req.headers.authentication) {
      return res.status(401).send({ message: "로그인 하지 않은 상태입니다." });
    }
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    // ----------

    // 본인이 올린 상품인지 확인
    let targetItemId = req.params.itemId;

    const foundItem = await Item.findOne({
      raw: true,
      where: {
        itemId: targetItemId,
      },
    });

    if (foundItem?.userId !== currentUserId) {
      return res
        .status(401)
        .send({ message: "You do not have permission to update" });
    }
    // ----------

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

    const updatedItem = await Item.update(updateInfo, {
      where: { itemId: targetItemId },
    });

    if (updatedItem) {
      res.status(200).send({ message: "Item is updated" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    // 로그인여부 확인(미들웨어 적용예정)
    if (!req.headers.authentication) {
      return res.status(401).send({ message: "로그인 하지 않은 상태입니다." });
    }
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    // ----------

    // 본인이 올린 상품인지 확인
    let targetItemId = req.params.itemId;

    const foundItem = await Item.findOne({
      raw: true,
      where: {
        itemId: targetItemId,
      },
    });

    if (foundItem?.userId !== currentUserId) {
      return res
        .status(401)
        .send({ message: "You do not have permission to delete" });
    }
    // ----------

    const deletedItem = await Item.destroy({
      where: { itemId: targetItemId },
    });

    if (deletedItem) {
      res.status(200).send({ message: "Item is deleted" });
    }
  } catch (err) {
    next(err);
  }
};
