import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
const Item = db.item;

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
      res.status(201).json({ message: "Item created successfully!" });
    }
  } catch (err) {
    next(err);
  }
};

export const findItem = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    let searchId = req.params.itemId;
    let editable = false;

    const foundItem = await Item.findOne({
      raw: true,
      where: {
        itemId: searchId,
      },
    });

    if (foundItem.userId === currentUserId) {
      editable = true;
    }

    res.status(200).send({ ...foundItem, editable });
  } catch (err) {
    next(err);
  }
};

export const findItems = async (req, res, next) => {
  try {
    const foundItem = await Item.findAll({ raw: true });
    res.status(200).send([...foundItem]);
  } catch (err) {
    next(err);
  }
};

export const updateItem = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    let targetItemId = req.params.itemId;

    const updateInfo = { ...req.body, userId: currentUserId };

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

    if (foundItem.userId !== currentUserId) {
      return res
        .status(401)
        .send({ message: "You do not have permission to delete" });
    }

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
