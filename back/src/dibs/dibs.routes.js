import express from "express";
import service from "./dibs.service";
const router = express.Router();

// 상품등록(C)
router.post("/", service.uploadDibs);

// 상품목록조회(R/L)
router.get("/", service.findDibs);

// 상품조회(R)
router.get("/:dibsId", service.findDibs);

// 상품수정(U)
router.put("/:dibsId", service.updateDibs);

// 상품삭제(D)
router.delete("/:dibsId", service.deleteDibs);

export default router;
