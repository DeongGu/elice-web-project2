import checkJWT from "../middlewares/checkJWT";
import controller from "./dibs.controller";

exports.uploadDibs = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const { dibsName } = req.body;

    if (!dibsName) {
      return res.status(400).send({ message: "NEED UPLOAD DIBS INFO" });
    }

    const dibs = {
      dibs_name: req.body.dibsName,
      dibs_desc: req.body.dibsDesc,
      user_id: result.userId,
    };

    const dibsResult = controller.createDibs(dibs);

    if (dibsResult === false) {
      return res.status(500).send({ message: "FAIL CREATE DIBS" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL UPLOAD" });
  }
};

exports.findDibs = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const dibs = await controller.findAllDibs();

    return res.status(200).send(dibs);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET DIBS" });
  }
};

exports.findDibs = async (req, res) => {
  try {
    const searchId = req.params.dibsId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const dibs = await controller.findOneDibs({ id: searchId });

    if (searchId === dibs.id) {
      editable = true;
    }

    return res.status(200).send([dibs, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET DIBS" });
  }
};

exports.updateDibs = async (req, res) => {
  try {
    const dibsId = req.params.dibsId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const dibs = {
      dibs_name: req.body.dibsName,
      dibs_desc: req.body.dibsDesc,
      status: req.body.status,
    };

    if (dibsId) {
      controller.updateDibs(dibs, dibsId);
    }

    return res.status(200).send({ message: "UPDATED DIBS" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE DIBS" });
  }
};

exports.deleteDibs = async (req, res) => {
  try {
    const dibsId = req.params.dibsId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (dibsId) {
      controller.deleteDibs(dibsId);
    }

    return res.status(200).send({ message: "DELETED DIBS" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE DIBS" });
  }
};
