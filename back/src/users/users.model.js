import { v4 as uuidv4 } from "uuid";
let pool = require("../config/db.config.js")("public");

const getConnection = (callback) => {
  pool.getConnection(function (err, conn) {
    if (!err) {
      callback(conn);
    }
  });
};

// 생성자
const User = function (user) {
  this.user_id = user.userId;
  this.email = user.email;
  this.password = user.password;
  this.nickname = user.nickname;
  this.role = user.role;
  this.name = user.name;
  this.phone_number = user.phoneNumber;
  this.profile_image = user.profileImage;
  this.user_desc = user.userDesc;
  this.created_at = user.createdAt;

  console.log("this.phone_number: ", this.phone_number);
};

// user 추가
User.create = (newUser, result) => {
  const user_id = uuidv4();
  getConnection((conn) => {
    conn.query(
      "INSERT INTO users SET ?",
      { ...newUser, user_id },
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("Created user: ", { ...newUser });
        result(null, { ...newUser });
      }
    );
    conn.release();
  });
};

// user id로 조회
User.findById = (userId, result) => {
  getConnection((conn) => {
    conn.query("SELECT * FROM users WHERE user_id = ?", userId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // 결과가 없을 시
      result({ kind: "not_found" }, null);
    });
    conn.release();
  });
};

// user 전체 조회
User.getAll = (result) => {
  getConnection((conn) => {
    conn.query("SELECT * FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("user: ", res);
      result(null, res);
    });
    conn.release();
  });
};

// user id로 수정
User.updateById = (userId, newUser, result) => {
  getConnection((conn) => {
    conn.query(
      "UPDATE users SET password = ?, nickname = ?, role = ?, name = ?, phone_number = ?, profile_image = ?, user_desc = ? WHERE user_id = ?",
      [
        newUser.password,
        newUser.nickname,
        newUser.role,
        newUser.name,
        newUser.phone_number,
        newUser.profile_image,
        newUser.user_desc,
        userId,
      ],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        if (res.affectedRows == 0) {
          // id 결과가 없을 시
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("update user: ", { userId: userId, ...newUser });
        result(null, { userId: userId, ...newUser });
      }
    );
    conn.release();
  });
};

// user id로 삭제
User.remove = (userId, result) => {
  getConnection((conn) => {
    conn.query("DELETE FROM users WHERE user_id = ?", userId, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // id 결과가 없을 시
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted user with userId: ", userId);
      result(null, res);
    });
    conn.release();
  });
};

// user 전체 삭제
User.removeAll = (result) => {
  getConnection((conn) => {
    conn.query("DELETE FROM users", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // id 결과가 없을 시
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted ${res.affectedRows} users");
      result(null, res);
    });
    conn.release();
  });
};

module.exports = User;
