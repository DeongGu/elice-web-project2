import db from "../../models";

exports.createDibs = (newDibs) => {
  try {
    db.dibs.create(newDibs);
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneDibs = (data) => {
  try {
    return db.dibs.findOne({
      where: data,
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllDibs = () => {
  try {
    return db.dibs.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateDibs = (updateDibs, id) => {
  try {
    db.dibs.update(updateDibs, {
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteDibs = (id) => {
  try {
    db.dibs.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
