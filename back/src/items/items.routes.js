import express from "express";
import service from "./items.service";
import validation from "./items.validation";
import { validate } from "express-validation";
const router = express.Router();

// 상품등록(C)
// router.post('/register', validate(validation, {}, {}), service.register);
router.post("/upload", service.uploadItem);

// 상품목록조회(R/L)
router.get("/", service.findItems);

// 상품조회(R)
router.get("/:itemId", service.findItem);

// 상품수정(U)
router.put("/update/:itemId", service.updateItem);

// 상품삭제(D)
router.delete("/:itemId", service.deleteItem);

export default router;
