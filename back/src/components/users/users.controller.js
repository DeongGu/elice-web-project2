import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import {
  clientSideError,
  notFoundError,
  authorizationError,
} from "../../middlewares/errorHandler";
import { apiSuccess, creationSuccess } from "../../middlewares/successHandler";

const User = db.user;

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (existingUser) {
      throw new clientSideError("Email already exists");
    }

    const createResult = await User.create(req.body);

    if (createResult) {
      res.send(creationSuccess(null, "User registered successfully"));
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
      throw new notFoundError("User not found");
    }

    const passwordMatch = await foundUser.isValidPassword(req.body.password);

    if (!passwordMatch) {
      throw new authorizationError("Invalid password");
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

    res.send(
      apiSuccess(
        {
          userId: foundUser.userId,
          nickname: foundUser.nickname,
          email: foundUser.email,
          Authentication: token,
        },
        "Successfully Logged in"
      )
    );
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout();
    res.send(apiSuccess(null, "Successfully logged out"));
  } catch (err) {
    next(err);
  }
};

export const findUser = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;

    let searchId = req.params.userId;

    const foundUser = await User.findOne({
      raw: true,
      attributes: searchId
        ? { exclude: ["email", "password", "phoneNumber", "username"] }
        : { exclude: "password" },
      where: searchId ? { userId: searchId } : { userId: currentUserId },
    });

    if (!foundUser) {
      throw new notFoundError("User information not found");
    }

    foundUser["editable"] =
      foundUser && foundUser.id === currentUserId ? true : false;

    res.send(apiSuccess(foundUser));
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

    if (req.file) {
      chgUserInfo["profileImage"] = req.file.location;
    }

    const updatedResult = await User.update(chgUserInfo, {
      where: { userId: currentUserId },
    });

    if (updatedResult) {
      res.send(apiSuccess(null, "User profile is updated"));
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
      where: { userId: currentUserId },
    });

    if (foundUser) {
      res.send(apiSuccess(null, "User information deleted"));
    }
  } catch (err) {
    next(err);
  }
};
