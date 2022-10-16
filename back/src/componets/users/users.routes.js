import { validate } from "express-validation";
import express from "express";
import loginRequired from "../../middlewares/loginRequired";
import wrapAsync from "../../middlewares/wrapAsync";
import validation from "./users.validation";
import * as controller from "./users.controller";

const router = express.Router();

// router.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Headers",
//     "x-access-token, Origin, Content-Type, Accept"
//   );
//   next();
// });

// 회원가입
router.post(
  "/users",
  // validate(validation.register, {}, {}),
  wrapAsync(controller.register)
);

// 로그인
router.post(
  "/users/login",
  // validate(validation.login),
  // validate(validation.login, {}, {}),
  wrapAsync(controller.login)
);

// 로그아웃
router.get("/users/logout", loginRequired, wrapAsync(controller.logout));

// 회원조회 (타인조회)
router.get(
  "/users/:userId",
  // validate(validation.fineAnotherUser, {}, {}),
  wrapAsync(controller.findUser)
);

// 회원조회 (본인조회)
router.get("/users", loginRequired, wrapAsync(controller.findUser));

// 회원프로필수정
router.put(
  "/users",
  loginRequired,
  // validate(validation.updateUser),
  wrapAsync(controller.updateUser)
);

// 회원탈퇴
router.delete("/users", loginRequired, wrapAsync(controller.deleteUser));

export default router;
