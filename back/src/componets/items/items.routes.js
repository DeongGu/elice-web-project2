import express from "express";
import { uploadS3 } from "../../middlewares/uploadS3";
import * as controller from "./items.controller";

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// 등록
router.post("/items", uploadS3.array("file"), controller.createItem);

// 조회
router.get("/items/:itemId", controller.findItem);

// 목록조회 (검색포함 예정)
router.get("/items", controller.findItems);

// 수정
router.put("/items/:itemId", uploadS3.array("file"), controller.updateItem);

// 삭제
router.delete("/items/:itemId", controller.deleteItem);

export default router;
