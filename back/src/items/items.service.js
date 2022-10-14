import jwt from "jsonwebtoken";
import checkJWT from "../middlewares/checkJWT";
import { SECRET_KEY } from "../config/env.config";
import controller from "./items.controller";

exports.uploadItem = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const { itemName } = req.body;

    if (!itemName) {
      return res.status(400).send({ message: "NEED UPLOAD ITEM INFO" });
    }

    const item = controller.createItem({ ...req.body, userId: result.userId });

    if (item === false) {
      return res.status(500).send({ message: "FAIL CREATE ITEM" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL UPLOAD" });
  }
};

exports.findItems = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const items = await controller.findAllItems();

    return res.status(200).send(items);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET ITEMS" });
  }
};

exports.findItem = async (req, res) => {
  try {
    const searchId = req.params.itemId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const item = await controller.findOneItem({ itemId: searchId });

    if (searchId === item.itemId) {
      editable = true;
    }

    return res.status(200).send([item, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET ITEM" });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (itemId) {
      controller.updateItem(req.body, itemId);
    }

    return res.status(200).send({ message: "UPDATED ITEM" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE ITEM" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (itemId) {
      controller.deleteItem(itemId);
    }

    return res.status(200).send({ message: "DELETED ITEM" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE ITEM" });
  }
};
