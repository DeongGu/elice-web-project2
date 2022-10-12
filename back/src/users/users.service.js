import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import checkJWT from "../middlewares/checkJWT";
import { SECRET_KEY } from "../config/env.config";
import controller from "./users.controller";

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send({ message: "NEED LOGIN USER INFO" });
    }

    const user = await controller.findOneUser(req.body);
    if (!user) {
      return res.status(403).send({ message: "USER NOT FOUND" });
    }

    const result = await bcrypt.compare(password, user.password);
    const userInfo = {
      id: user.id,
      username: user.username,
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

exports.readProfile = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }
    const user = await controller.findOneUser(result);

    return res.status(200).send(user);
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

    const user = await controller.checkUserEmail(req.body);

    if (user) {
      return res.status(400).send({ message: "UNUSABLE EMAIL" });
    }

    // const hash = await bcrypt.hash(req.body.password, 10);
    // const result = controller.createUser(req.body, hash);
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
    const { password, name } = req.body;

    if (!name && !password) {
      return res.status(400).send({ message: "NEED USER INFO" });
    }

    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (password === false) {
      const hash = await bcrypt.hash(password, 10);

      controller.updateUserPassword(name, result.username, hash);

      return res
        .status(200)
        .send({ message: "UPDATED PROFILE PASSWORD AND NAME" });
    }

    controller.updateUser(name, result.username);

    return res.status(200).send({ message: "UPDATED PROFILE NAME" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE PROFILE" });
  }
};
