import db from "../../models";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config/env.config";
import {
  clientSideError,
  notFoundError,
  internalServerError,
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
      // return res.status(400).send({ message: "Email already exists." });
    }

    const createResult = await User.create(req.body);

    if (createResult) {
      res.send(creationSuccess("User registered successfully"));
      // res.status(201).json({ message: "User registered successfully!" });
    }
  } catch (err) {
    throw new internalServerError("User registration failed");
    // next(err);
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
      // return res.status(404).send({ message: "User Not found." });
    }

    const passwordMatch = await foundUser.isValidPassword(req.body.password);

    if (!passwordMatch) {
      res.send({ accessToken: null });
      throw new authorizationError("Invalid Password");
      // return res.status(401).send({
      //   accessToken: null,
      //   message: "Invalid Password!",
      // });
    }

    const token = jwt.sign(
      {
        userId: foundUser.userId,
        nickname: foundUser.nickname,
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
        "Successfully logged in"
      )
    );

    // res.status(200).send({
    //   userId: foundUser.userId,
    //   nickname: foundUser.nickname,
    //   email: foundUser.email,
    //   Authentication: token,
    // });
  } catch (err) {
    throw new internalServerError("Log-in failed");
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout();
    res.send(apiSuccess(null, "Successfully logged out"));
    // res.send({ message: "Successfully logged out." });
  } catch (err) {
    throw new internalServerError("Log-out failed");
    // next(err);
  }
};

export const findUser = async (req, res, next) => {
  try {
    const currentUserId = jwt.verify(
      req.headers.authentication,
      SECRET_KEY
    ).userId;
    let searchId = req.params.userId;
    let editable = false;

    if (!searchId && currentUserId) {
      searchId = currentUserId;
      editable = true;
    }

    const foundUser = await User.findOne({
      raw: true,
      attributes: { exclude: "password" },
      where: {
        userId: searchId,
      },
    });

    res.send(apiSuccess({ ...foundUser, editable }, "User data found"));
    // res.status(200).send({ ...foundUser, editable });
  } catch (err) {
    throw new internalServerError("User not found");
    // next(err);
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

    const foundUser = await User.update(chgUserInfo, {
      where: { userId: currentUserId },
    });

    if (foundUser) {
      res.send(apiSuccess(null, "User profile is updated"));
      // res.status(200).send({ message: "User profile is updated" });
    }
  } catch (err) {
    throw new internalServerError("User profile update failed");
    // next(err);
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
      res.send(apiSuccess(null, "User information is deleted"));
      // res.status(200).send({ message: "User is deleted" });
    }
  } catch (err) {
    throw new internalServerError("User information deletion failed");
    // next(err);
  }
};
