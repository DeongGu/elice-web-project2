import db from "../models";

exports.createOrder = (newOrder) => {
  try {
    db.order.create(newOrder);
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneOrder = (data) => {
  try {
    return db.order.findOne({
      where: data,
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllOrders = () => {
  try {
    return db.order.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateOrder = (updateOrder, id) => {
  try {
    db.order.update(updateOrder, {
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteOrder = (id) => {
  try {
    db.order.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
