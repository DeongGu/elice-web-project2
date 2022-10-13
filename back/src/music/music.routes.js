import express from "express";
import service from "./music.service";
// import validation from "./items.validation";
// import { validate } from "express-validation";
import { MULTER_MUSIC } from "../middlewares/uploadS3";
const router = express.Router();

router.get("/detailMusic/:musicId", service.detailMusic);
router.get("/searchMusic", service.searchMusic);
router.post("/updateMusic/:musicId", service.updateMusic);
router.post(
  "/uploadMusic/:username/:userId",
  MULTER_MUSIC.single("music"),
  service.uploadMusic
);
// For Check User Access before Create or Update
router.post("/checkUser", service.checkUser);
// For Change File
router.post(
  "/changeFile/:musicId",
  MULTER_MUSIC.single("music"),
  service.changeFile
);

export default router;
