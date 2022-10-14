import db from "../models";

exports.createItem = (data) => {
  try {
    db.Item.create({ ...data });
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneItem = (data) => {
  try {
    return db.Item.findOne({
      where: { ...data },
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllItems = () => {
  try {
    return db.Item.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateItem = (data, itemId) => {
  try {
    db.Item.update(
      { ...data },
      {
        where: { itemId },
      }
    );

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteItem = (itemId) => {
  try {
    db.Item.destroy({
      where: { itemId },
    });

    return true;
  } catch (err) {
    return false;
  }
};
