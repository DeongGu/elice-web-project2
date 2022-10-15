import db from "../models";

exports.createItem = (newItem) => {
  try {
    db.item.create(newItem);
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneItem = (data) => {
  try {
    return db.item.findOne({
      where: data,
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllItems = () => {
  try {
    return db.item.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateItem = (updateItem, id) => {
  try {
    db.item.update(updateItem, {
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteItem = (id) => {
  try {
    db.item.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
