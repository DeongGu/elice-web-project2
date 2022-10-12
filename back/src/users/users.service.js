import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkJWT from "../middlewares/checkJWT";
import { SECRET_KEY } from "../config/env.config";
import controller from "./users.controller";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "NEED LOGIN USER INFO" });
    }

    const user = await controller.findOneUser({ email });

    if (!user) {
      return res.status(403).send({ message: "USER NOT FOUND" });
    }

    const result = await bcrypt.compare(password, user.password);
    const userInfo = {
      userId: user.userId,
      email: user.email,
      nickname: user.nickname,
      // username: user.username,
    };

    if (result === true) {
      const token = jwt.sign(userInfo, SECRET_KEY);

      return res.status(200).send({ Authentication: token });
    }

    return res.status(401).send({ message: "INCORRECT PASSWORD" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL LOGIN" });
  }
};

exports.findUsers = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const users = await controller.findUsers();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET USERS" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const searchId = req.params.userId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result && req.headers.userId === searchId) {
      editable = true;
    }
    const user = await controller.findOneUser({ userId: searchId });

    return res.status(200).send([user, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL READ PROFILE" });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    if (!email || !password || !nickname) {
      return res.status(400).send({ message: "NEED REGISTER USER INFO" });
    }

    const user = await controller.findOneUser({ email });

    if (user) {
      return res.status(400).send({ message: "UNUSABLE EMAIL" });
    }

    const result = controller.createUser(req.body);

    if (result === false) {
      return res.status(500).send({ message: "FAIL CREATE USER" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL REGISTER" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (result.userId) {
      controller.updateUser(req.body, result.userId);
    }

    return res.status(200).send({ message: "UPDATED PROFILE" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE PROFILE" });
  }
};

exports.leave = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (result.userId) {
      controller.deleteUser(result.userId);
    }

    return res.status(200).send({ message: "DELETED USER" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE USER" });
  }
};
