import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { Op } from "sequelize";
const Dibs = db.dibs;
const Item = db.item;

export const createDibs = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;

    let createInfo = { itemId: req.params.itemId, userId: currentUserId };

    const createResult = await Dibs.create(createInfo);

    if (createResult) {
      res.status(201).json({
        message: "Dibs created successfully!",
        result: createResult,
      });
    }
  } catch (err) {
    next(err);
  }
};

export const findDibs = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;

    const { status, search, limit, offset } = req.query;
    const foundDibs = await Dibs.findAll({
      raw: true,
      where: { userId: currentUserId },
      include: [
        {
          model: Item,
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
          required: true,
        },
      ],
      order: [["updatedAt", "DESC"]],
      limit: Number(!limit ? 1000 : limit),
      offset: Number(!offset ? 0 : offset),
    });
    res.status(200).send(foundDibs);
  } catch (err) {
    next(err);
  }
};

export const deleteDibs = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    let targetDibsId = req.params.dibsId;

    const foundDibs = await Dibs.findOne({
      raw: true,
      where: {
        dibsId: targetDibsId,
      },
    });

    if (foundDibs.userId !== currentUserId) {
      return res
        .status(401)
        .send({ message: "You do not have permission to delete" });
    }

    const deletedDibs = await Dibs.destroy({
      where: { dibsId: targetDibsId },
    });

    if (deletedDibs) {
      res.status(200).send({ message: "Dibs is deleted" });
    }
  } catch (err) {
    next(err);
  }
};
