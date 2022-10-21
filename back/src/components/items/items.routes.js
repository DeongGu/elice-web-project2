import express from "express";
import { uploadS3 } from "../../middlewares/uploadS3";
import { itemValidation, itemValidationPut } from "./items.validation";
import authMiddleware from "../../middlewares/authMiddleware";
import * as controller from "./items.controller";

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// 상품등록
router.post(
  "/items",
  authMiddleware,
  uploadS3.array("file"),
  itemValidation,
  controller.createItem
);

// 상품조회
router.get("/items/:itemId", controller.findItem);

// 목록조회 (검색포함)
router.get("/items", controller.findItems);

// 수정
router.put(
  "/items/:itemId",
  authMiddleware,
  uploadS3.array("file"),
  itemValidationPut,
  controller.updateItem
);

// 삭제
router.delete("/items/:itemId", authMiddleware, controller.deleteItem);

export default router;
