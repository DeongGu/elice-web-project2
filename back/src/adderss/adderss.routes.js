import express from "express";
import service from "./adderss.service";
const router = express.Router();

// 상품등록(C)
router.post("/", service.uploadAdderss);

// 상품목록조회(R/L)
router.get("/", service.findAdderss);

// 상품조회(R)
router.get("/:adderssId", service.findAdderss);

// 상품수정(U)
router.put("/:adderssId", service.updateAdderss);

// 상품삭제(D)
router.delete("/:adderssId", service.deleteAdderss);

export default router;
