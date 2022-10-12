import db from "../models";

// exports.createUser = (data, hash) => {
exports.createUser = (data) => {
  try {
    db.User.create({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
      role: data.role,
      username: data.username,
      phone_number: data.phoneNumber,
      profile_image: data.profileImage,
      user_desc: data.userDesc,
      // ...data,
    });

    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneUser = (data) => {
  try {
    return db.User.findOne({
      where: {
        userId: data.userId,
      },
    });
  } catch (err) {
    throw err;
  }
};

exports.checkUserEmail = (data) => {
  try {
    return db.User.findOne({
      where: {
        email: data.email,
      },
    });
  } catch (err) {
    throw err;
  }
};

exports.updateUser = (username, userId) => {
  try {
    db.User.update(
      {
        username,
      },
      {
        where: { userId },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

exports.updateUserPassword = (userId, password) => {
  try {
    db.User.update(
      {
        password,
      },
      {
        where: { userId },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};
