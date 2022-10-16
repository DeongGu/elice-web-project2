import db from "../../models";
import jwt from "jsonwebtoken";
// import debug from 'debug';
import expressValidation from "express-validation";
// import { generateToken } from '../../helpers/authentication';
import { APISuccess, APIClientError } from "../../middlewares/APIResponse";

const User = db.user;

export const register = async (req, res, next) => {
  try {
    const existingUser = User.findOne({
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
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const foundUser = User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!foundUser) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordMatch = await User.isValidPassword(password);

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
      config.secret,
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
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

export const logout = async (req, res, next) => {
  try {
    req.logout();

    res.send({ message: "Successfully logged out." });
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

export const findUser = async (req, res) => {
  try {
    const currentUserId = req.currentUserId;
    const searchId = req.params.userId;
    let editable = false;

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
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

export const updateUser = async (req, res) => {
  try {
    const currentUserId = req.currentUserId;
    const foundUser = await User.update(
      {
        nickname: req.body.nickname,
        username: req.body.username,
        phone_number: req.body.phoneNumber,
        profile_image: req.body.profileImage,
        user_desc: req.body.userDesc,
      },
      {
        where: { id: currentUserId },
      }
    );
    if (foundUser) {
      res.status(200).send({ message: "User pofile is updated" });
    }
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const currentUserId = req.currentUserId;
    const foundUser = await User.delete({
      where: { id: currentUserId },
    });
    if (foundUser) {
      res.status(200).send({ message: "User is deleted" });
    }
  } catch (err) {
    if (
      !(
        err instanceof APIClientError ||
        err instanceof expressValidation.ValidationError
      )
    ) {
      throw new Error(err);
    } else {
      throw err;
    }
  }
};
