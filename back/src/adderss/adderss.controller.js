import db from "../models";

exports.createAdderss = (newAdderss) => {
  try {
    db.adderss.create(newAdderss);
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneAdderss = (data) => {
  try {
    return db.adderss.findOne({
      where: data,
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllAdderss = () => {
  try {
    return db.adderss.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateAdderss = (updateAdderss, id) => {
  try {
    db.adderss.update(updateAdderss, {
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteAdderss = (id) => {
  try {
    db.adderss.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
