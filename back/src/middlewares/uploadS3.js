import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import path from "path";

import { AWS_KEY, AWS_SECRET_KEY, BURKET } from "../config/env.config";

const s3 = new aws.S3({
  accessKeyId: AWS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  Bucket: BURKET,
});

export const uploadS3 = multer({
  storage: multerS3({
    s3,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    bucket: `${BURKET}/images`,
    key: (req, file, cb) => {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.mimetype });
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});
