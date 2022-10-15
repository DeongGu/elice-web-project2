import db from "../models";

exports.createDelivery = (newDelivery) => {
  try {
    db.delivery.create(newDelivery);
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneDelivery = (data) => {
  try {
    return db.delivery.findOne({
      where: data,
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllDeliveries = () => {
  try {
    return db.delivery.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateDelivery = (updateDelivery, id) => {
  try {
    db.delivery.update(updateDelivery, {
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteDelivery = (id) => {
  try {
    db.delivery.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
