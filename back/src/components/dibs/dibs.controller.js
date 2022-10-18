import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import { Op } from "sequelize";
const Dibs = db.dibs;

export const createDibs = async (req, res, next) => {
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
      createInfo["dibsImage"] = urls;
    }

    if (createInfo.dibsType) {
      const dibsType = createInfo.dibsType?.split(",");
      createInfo["dibsType"] = dibsType;
    }

    const createResult = await Dibs.create(createInfo);

    if (createResult) {
      res.status(201).json({ message: "Dibs created successfully!" });
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
    let searchId = req.params.dibsId;
    let editable = false;

    const foundDibs = await Dibs.findOne({
      raw: true,
      where: {
        dibsId: searchId,
      },
    });

    if (foundDibs.userId === currentUserId) {
      editable = true;
    }

    res.status(200).send({ ...foundDibs, editable });
  } catch (err) {
    next(err);
  }
};

export const findDibss = async (req, res, next) => {
  try {
    const { status, search, limit, offset } = req.query;
    const foundDibs = await Dibs.findAll({
      raw: true,
      where: {
        [Op.and]: [
          status ? { status: status } : null,
          search
            ? {
                [Op.or]: [
                  { dibsName: { [Op.like]: `%${search}%` } },
                  { dibsType: { [Op.substring]: `${search}` } },
                  { dibsDesc: { [Op.like]: `%${search}%` } },
                ],
              }
            : null,
        ],
      },
      order: [["updatedAt", "DESC"]],
      limit: Number(!limit ? 10 : limit),
      offset: Number(!offset ? 0 : offset),
    });
    res.status(200).send(foundDibs);
  } catch (err) {
    next(err);
  }
};

export const updateDibs = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    let targetDibsId = req.params.dibsId;

    const updateInfo = { ...req.body, userId: currentUserId };

    if (req.files && req.files.length > 0) {
      let urls = new Array();
      req.files.map((file) => {
        urls.push(file.location);
      });
      updateInfo["dibsImage"] = urls;
    }

    if (updateInfo.dibsType) {
      const dibsType = updateInfo.dibsType?.split(",");
      updateInfo["dibsType"] = dibsType;
    }

    const updatedDibs = await Dibs.update(updateInfo, {
      where: { dibsId: targetDibsId },
    });

    if (updatedDibs) {
      res.status(200).send({ message: "Dibs is updated" });
    }
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
