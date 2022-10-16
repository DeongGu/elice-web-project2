import express from "express";
import service from "./reviews.service";
const router = express.Router();

// 상품등록(C)
router.post("/", service.uploadReview);

// 상품목록조회(R/L)
router.get("/", service.findReviews);

// 상품조회(R)
router.get("/:reviewId", service.findReview);

// 상품수정(U)
router.put("/:reviewId", service.updateReview);

// 상품삭제(D)
router.delete("/:reviewId", service.deleteReview);

export default router;
