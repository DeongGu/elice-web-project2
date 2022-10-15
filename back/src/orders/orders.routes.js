import express from "express";
import service from "./orders.service";
const router = express.Router();

// 주문등록(C)
router.post("/", service.makeOrder);

// 주문목록조회(R/L)
router.get("/", service.findOrders);

// 주문조회(R)
router.get("/:orderId", service.findOrder);

// 주문수정(U)
router.put("/:orderId", service.updateOrder);

// 주문삭제(D)
router.delete("/:orderId", service.deleteOrder);

export default router;
