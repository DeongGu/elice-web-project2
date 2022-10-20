import db from "../../models";
import jwt from "jsonwebtoken";
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

    const createResult = await User.create(req.body);

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
        userId: foundUser.userId,
        email: foundUser.email,
      },
      SECRET_KEY,
      {
        expiresIn: 86400, // 24 hours
      }
    );

    res.status(200).send({
      userId: foundUser.userId,
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

    let searchId = req.params.userId;

    const foundUser = await User.findOne({
      raw: true,
      attributes: searchId
        ? { exclude: ["email", "password"] }
        : { exclude: "password" },
      where: searchId ? { userId: searchId } : { userId: currentUserId },
    });

    foundUser["editable"] =
      foundUser && foundUser.id === currentUserId ? true : false;

    res.status(200).send(foundUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
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

    let chgUserInfo = { ...req.body };

    if (req.file) {
      chgUserInfo["profileImage"] = req.file.location;
    }

    const updetedResult = await User.update(chgUserInfo, {
      where: { userId: currentUserId },
    });
    if (updetedResult) {
      res.status(200).send({ message: "User pofile is updated" });
    }
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
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

    const foundUser = await User.destroy({
      where: { userId: currentUserId },
    });

    if (foundUser) {
      res.status(200).send({ message: "User is deleted" });
    }
  } catch (err) {
    next(err);
  }
};
