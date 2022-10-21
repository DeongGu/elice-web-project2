import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const SECRET_KEY = process.env.JWT_SECRET_KEY;
export const AWS_KEY = process.env.AWS_KEY;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
export const BURKET = process.env.BURKET;
