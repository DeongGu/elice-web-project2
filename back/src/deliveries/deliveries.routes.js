import express from "express";
import service from "./deliveries.service";
const router = express.Router();

// 상품등록(C)
router.post("/", service.uploadDelivery);

// 상품목록조회(R/L)
router.get("/", service.findDeliveries);

// 상품조회(R)
router.get("/:deliveryId", service.findDelivery);

// 상품수정(U)
router.put("/:deliveryId", service.updateDelivery);

// 상품삭제(D)
router.delete("/:deliveryId", service.deleteDelivery);

export default router;
