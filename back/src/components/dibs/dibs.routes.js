import express from "express";
import * as controller from "./dibs.controller";

const router = express.Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// 찜하기
router.post("/dibs/:itemId", controller.createDibs);

// 목록조회 (검색포함)
router.get("/dibs", controller.findDibs);

// 찜취소(삭제)
router.delete("/dibs/:dibsId", controller.deleteDibs);

export default router;
