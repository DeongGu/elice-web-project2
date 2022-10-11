import { Router } from "express";

const testRouter = Router();

testRouter.post("/item/create", async (req, res, next) => {
  try {
    const { itemImage, itemName, itemDetail, description } = req.body;
    // const message = "백에 잠시 들름";
    const newItem = { itemImage, itemName, itemDetail, description };
    res.status(201).json(newItem);
    console.log(newItem);
  } catch (error) {
    console.log(error);
    next(e);
  }
});

testRouter.get("/item/create", async (req, res, next) => {
  try {
    res.status(201).json({ ㅋㅋ: "ㅋㅋ" });
    res.send("zzzzz");
    console.log("왓음");
  } catch (error) {
    console.log(error);
    next(e);
  }
});

export { testRouter };
