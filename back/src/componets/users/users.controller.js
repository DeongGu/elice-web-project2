import db from "../../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { SECRET_KEY } from "../../config/env.config";

const User = db.user;

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists." });
    }

    const createResult = await User.create({
      email: req.body.email,
      password: req.body.password,
      nickname: req.body.nickname,
      role: req.body.role,
      name: req.body.username,
      phone_number: req.body.phoneNumber,
      profile_image: req.body.profileImage,
      user_desc: req.body.userDesc,
    });

    if (createResult) {
      res.status(201).json({ message: "User registered successfully!" });
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!foundUser) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordMatch = await foundUser.isValidPassword(req.body.password);

    if (!passwordMatch) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      {
        userId: foundUser.id,
        nickname: foundUser.nickname,
        email: foundUser.email,
      },
      SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      userId: foundUser.id,
      nickname: foundUser.nickname,
      email: foundUser.email,
      Authentication: token,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout();

    res.send({ message: "Successfully logged out." });
  } catch (err) {
    next(err);
  }
};

export const findUser = async (req, res, next) => {
  console.log(req.headers);
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    const searchId = req.params.userId;
    let editable = false;

    console.log(currentUserId);
    console.log(searchId);

    if (currentUserId && currentUserId === searchId) {
      editable = true;
    }

    const foundUser = await User.findOne({
      attributes: [
        ["id", "userId"],
        "email",
        "nickname",
        "name",
        ["phone_number", "phoneNumber"],
        ["profile_image", "profileImage"],
        ["user_desc", "userDesc"],
      ],
      where: {
        id: currentUserId || searchId,
      },
    });

    res.status(200).send({ ...foundUser, editable });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;

    let chgUserInfo = { ...req.body };

    if (chgUserInfo.password) {
      chgUserInfo["password"] = await bcrypt.hash(req.body.password, 10);
    }

    if (chgUserInfo.phoneNumber) {
      chgUserInfo["phone_number"] = chgUserInfo.phoneNumber;
    }

    if (chgUserInfo.userDesc) {
      chgUserInfo["user_desc"] = chgUserInfo.userDesc;
    }

    const foundUser = await User.update(chgUserInfo, {
      where: { id: currentUserId },
    });
    if (foundUser) {
      res.status(200).send({ message: "User pofile is updated" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    const foundUser = await User.destroy({
      where: { id: currentUserId },
    });
    if (foundUser) {
      res.status(200).send({ message: "User is deleted" });
    }
  } catch (err) {
    next(err);
  }
};
