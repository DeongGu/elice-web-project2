import db from "../models";

exports.createUser = (data) => {
  try {
    db.User.create({
      ...data,
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
      where: { ...data },
    });
  } catch (err) {
    throw err;
  }
};

exports.findUsers = () => {
  try {
    return db.User.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateUser = (data, userId) => {
  try {
    db.User.update(
      { ...data },
      {
        where: { userId },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

exports.updatePassword = (userId, password) => {
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

exports.deleteUser = (userId) => {
  try {
    db.User.destroy({
      where: { userId },
    });

    return true;
  } catch (err) {
    return false;
  }
};
