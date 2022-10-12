import express from "express";
import service from "./users.service";
import validation from "./users.validation";
import { validate } from "express-validation";
const router = express.Router();

// 회원가입
// router.post('/register', validate(validation, {}, {}), service.register);
router.post("/register", service.register);

// 로그인
router.post("/login", service.login);

// 프로필조회
router.post("/readProfile", service.readProfile);

// 프로필수정
router.post("/updateProfile", service.updateProfile);

export default router;
