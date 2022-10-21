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

// 회원가입
export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      throw new clientSideError("Email already exists");
    }

    const createResult = await User.create(req.body);

    if (createResult) {
      res.send(creationSuccess(createResult, "User registered successfully"));
    }
    
  } catch (err) {
    next(err);
  }
};

// 로그인
export const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (!foundUser) {
      throw new notFoundError("User");
    }

    if (!(await foundUser.isValidPassword(req.body.password))) {
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
        "Logged in successfully"
      )
    );
  } catch (err) {
    next(err);
  }
};

// 로그아웃
export const logout = async (req, res, next) => {
  try {
    req.logout();
    res.send(apiSuccess(null, "Logged out successfully"));
  } catch (err) {
    next(err);
  }
};

// 회원조회
export const findUser = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const searchId = req.params?.userId;

    const foundUser = await User.findOne({
      raw: true,
      attributes: !searchId
        ? { exclude: "password" }
        : { exclude: ["email", "password"] },
      where: !searchId ? { userId: currentUserId } : { userId: searchId },
    });

    if (!foundUser) {
      throw new notFoundError("User");
    }

    foundUser["editable"] = foundUser?.userId === currentUserId;

    res.send(apiSuccess(foundUser, "Found user successfully"));
  } catch (err) {
    next(err);
  }
};

// 회원수정
export const updateUser = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    if (req.file) {
      req.body.profileImage = req.file.location;
    }

    const updatedResult = await User.update(req.body, {
      where: { userId: currentUserId },
    });
    if (updatedResult) {
      res.send(apiSuccess(updatedResult, "User profile is updated"));
    }
  } catch (err) {
    next(err);
  }
};

// 회원탈퇴
export const deleteUser = async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;

    const deletedUser = await User.destroy({
      where: { userId: currentUserId },
    });

    if (deletedUser) {
      res.send(apiSuccess(deletedUser, "User information deleted"));
    }
  } catch (err) {
    next(err);
  }
};
