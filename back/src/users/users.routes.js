import express from "express";
import validation from "./users.validation";
const controller = require("./users.controller");
const { validate } = require("express-validation");
const router = express.Router();

// 회원가입
router.post("/users/register", validate(validation, {}, {}), controller.create);

// id로 조회
router.get("/users/:userId", controller.findOne);

// id로 수정
router.put("/users/:userId", validate(validation, {}, {}), controller.update);

// id로 삭제
router.delete("/users/:userId", controller.delete);

// 전체 조회
router.get("/users", controller.findAll);

// 전체 삭제
router.delete("/users", controller.deleteAll);

module.exports = router;
