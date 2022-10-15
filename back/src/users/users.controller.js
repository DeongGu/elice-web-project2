import db from "../models";

exports.createUser = (data) => {
  try {
    db.user.create({
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
    return db.user.findOne({
      where: { ...data },
    });
  } catch (err) {
    throw err;
  }
};

exports.findUsers = () => {
  try {
    return db.user.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateUser = (data, id) => {
  console.log(data);
  console.log(id);
  try {
    db.user.update(
      { ...data },
      {
        where: { id: id },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

exports.updatePassword = (id, password) => {
  try {
    db.user.update(
      {
        password,
      },
      {
        where: { id },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteUser = (id) => {
  try {
    db.user.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
