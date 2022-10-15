import checkJWT from "../middlewares/checkJWT";
import controller from "./orders.controller";

exports.makeOrder = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const { itemId } = req.body;

    if (!itemId) {
      return res.status(400).send({ message: "NEED UPLOAD ORDER INFO" });
    }

    const order = {
      item_id: req.body.itemId,
      user_id: result.userId,
      message: req.body.message,
    };

    const orderResult = controller.createOrder(order);

    if (orderResult === false) {
      return res.status(500).send({ message: "FAIL CREATE ORDER" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL UPLOAD" });
  }
};

exports.findOrders = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const orders = await controller.findAllOrders();

    return res.status(200).send(orders);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET ORDERS" });
  }
};

exports.findOrder = async (req, res) => {
  try {
    const searchId = req.params.orderId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const order = await controller.findOneOrder({ id: searchId });

    if (searchId === order.id) {
      editable = true;
    }

    return res.status(200).send([order, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET ORDER" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const order = {
      message: req.body.message,
    };

    if (orderId) {
      controller.updateOrder(order, orderId);
    }

    return res.status(200).send({ message: "UPDATED ORDER" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE ORDER" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (orderId) {
      controller.deleteOrder(orderId);
    }

    return res.status(200).send({ message: "DELETED ORDER" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE ORDER" });
  }
};
