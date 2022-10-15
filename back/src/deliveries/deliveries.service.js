import checkJWT from "../middlewares/checkJWT";
import controller from "./deliveries.controller";

exports.uploadDelivery = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const { deliveryName } = req.body;

    if (!deliveryName) {
      return res.status(400).send({ message: "NEED UPLOAD DELIVERY INFO" });
    }

    const delivery = {
      delivery_name: req.body.deliveryName,
      delivery_desc: req.body.deliveryDesc,
      user_id: result.userId,
    };

    const deliveryResult = controller.createDelivery(delivery);

    if (deliveryResult === false) {
      return res.status(500).send({ message: "FAIL CREATE DELIVERY" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL UPLOAD" });
  }
};

exports.findDeliveries = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const deliveries = await controller.findAllDeliveries();

    return res.status(200).send(deliveries);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET DELIVERIES" });
  }
};

exports.findDelivery = async (req, res) => {
  try {
    const searchId = req.params.deliveryId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const delivery = await controller.findOneDelivery({ id: searchId });

    if (searchId === delivery.id) {
      editable = true;
    }

    return res.status(200).send([delivery, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET DELIVERY" });
  }
};

exports.updateDelivery = async (req, res) => {
  try {
    const deliveryId = req.params.deliveryId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const delivery = {
      delivery_name: req.body.deliveryName,
      delivery_desc: req.body.deliveryDesc,
      status: req.body.status,
    };

    if (deliveryId) {
      controller.updateDelivery(delivery, deliveryId);
    }

    return res.status(200).send({ message: "UPDATED DELIVERY" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE DELIVERY" });
  }
};

exports.deleteDelivery = async (req, res) => {
  try {
    const deliveryId = req.params.deliveryId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (deliveryId) {
      controller.deleteDelivery(deliveryId);
    }

    return res.status(200).send({ message: "DELETED DELIVERY" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE DELIVERY" });
  }
};
