require("dotenv/config");
const mysql = require("mysql2");
const DB_URL = process.env.DB_URL || "DB 서버 주소가 설정되지 않았습니다.";

const db = (schema) => {
  return mysql.createPool({
    host: `${DB_URL}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${schema}`,
  });
};

module.exports = db;
