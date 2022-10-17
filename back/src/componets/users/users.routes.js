import express from "express";
import * as controller from "./users.controller";

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// 회원가입
router.post("/users", controller.register);

// 로그인
router.post("/users/login", controller.login);

// 로그아웃
router.get("/users/logout", controller.logout);

// 회원조회 (타인조회)
router.get("/users/:userId", controller.findUser);

// 회원조회 (본인조회)
router.get("/users", controller.findUser);

// 회원프로필수정
router.put("/users", controller.updateUser);

// 회원탈퇴
router.delete("/users", controller.deleteUser);

export default router;
