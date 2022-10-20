import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { Op } from "sequelize";
import { authorizationError } from "../../middlewares/errorHandler";
import { apiSuccess, creationSuccess } from "../../middlewares/successHandler";

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
      res.send(creationSuccess(createResult, "Dibs created successfully"));
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
    res.send(apiSuccess(foundDibs, "Dibs search results"));
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
      try {
        throw new authorizationError("Unauthorized");
      } catch (err) {
        next(err);
      }
    }

    const deletedDibs = await Dibs.destroy({
      where: { dibsId: targetDibsId },
    });

    if (deletedDibs) {
      res.send(apiSuccess(null, "Dibs deleted"));
    }
  } catch (err) {
    next(err);
  }
};
