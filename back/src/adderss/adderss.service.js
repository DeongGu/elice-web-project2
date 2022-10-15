import checkJWT from "../middlewares/checkJWT";
import controller from "./adderss.controller";

exports.uploadAdderss = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const { adderssName } = req.body;

    if (!adderssName) {
      return res.status(400).send({ message: "NEED UPLOAD ADDERSS INFO" });
    }

    const adderss = {
      adderss_name: req.body.adderssName,
      adderss_desc: req.body.adderssDesc,
      user_id: result.userId,
    };

    const adderssResult = controller.createAdderss(adderss);

    if (adderssResult === false) {
      return res.status(500).send({ message: "FAIL CREATE ADDERSS" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL UPLOAD" });
  }
};

exports.findAdderss = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const adderss = await controller.findAllAdderss();

    return res.status(200).send(adderss);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET ADDERSS" });
  }
};

exports.findAdderss = async (req, res) => {
  try {
    const searchId = req.params.adderssId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const adderss = await controller.findOneAdderss({ id: searchId });

    if (searchId === adderss.id) {
      editable = true;
    }

    return res.status(200).send([adderss, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET ADDERSS" });
  }
};

exports.updateAdderss = async (req, res) => {
  try {
    const adderssId = req.params.adderssId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const adderss = {
      adderss_name: req.body.adderssName,
      adderss_desc: req.body.adderssDesc,
      status: req.body.status,
    };

    if (adderssId) {
      controller.updateAdderss(adderss, adderssId);
    }

    return res.status(200).send({ message: "UPDATED ADDERSS" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE ADDERSS" });
  }
};

exports.deleteAdderss = async (req, res) => {
  try {
    const adderssId = req.params.adderssId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (adderssId) {
      controller.deleteAdderss(adderssId);
    }

    return res.status(200).send({ message: "DELETED ADDERSS" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE ADDERSS" });
  }
};
