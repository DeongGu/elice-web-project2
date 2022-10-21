import db from "../../models";
import { Op } from "sequelize";
import {
  notFoundError,
  authorizationError,
} from "../../middlewares/errorHandler";
import { apiSuccess, creationSuccess } from "../../middlewares/successHandler";
const Dibs = db.dibs;
const Item = db.item;
const User = db.user;

// 찜하기
export const createDibs = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const targetItemId = req.params.itemId;
    let createInfo = { itemId: targetItemId, userId: currentUserId };

    const createResult = await Dibs.create(createInfo);

    if (createResult) {
      res.send(creationSuccess(createResult, "Dibs created successfully!"));
    }
  } catch (err) {
    next(err);
  }
};

// 찜목록조회(검색포함)
export const findDibs = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;

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
                      { itemCategory: { [Op.like]: `%${search}%` } },
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

    if (!foundDibs) {
      throw new notFoundError("Dibs");
    }

    res.send(apiSuccess(foundDibs, "Dibs found successfully!"));
  } catch (err) {
    next(err);
  }
};

// 찜취소(삭제)
export const deleteDibs = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    let targetDibsId = req.params.dibsId;

    const foundDibs = await Dibs.findOne({
      raw: true,
      where: {
        dibsId: targetDibsId,
      },
    });

    if (!foundDibs) {
      throw new notFoundError("Dibs");
    }

    if (foundDibs?.userId !== currentUserId) {
      throw new authorizationError("Unauthorized");
    }

    const deletedDibs = await Dibs.destroy({
      where: { dibsId: targetDibsId },
    });

    if (deletedDibs) {
      res.send(apiSuccess(deletedDibs, "Dibs canceled"));
    }
  } catch (err) {
    next(err);
  }
};
