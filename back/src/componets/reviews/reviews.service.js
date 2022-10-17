import checkJWT from "../middlewares/checkJWT";
import controller from "./reviews.controller";

exports.uploadReview = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const { reviewName } = req.body;

    if (!reviewName) {
      return res.status(400).send({ message: "NEED UPLOAD REVIEW INFO" });
    }

    const review = {
      review_name: req.body.reviewName,
      review_desc: req.body.reviewDesc,
      user_id: result.userId,
    };

    const reviewResult = controller.createReview(review);

    if (reviewResult === false) {
      return res.status(500).send({ message: "FAIL CREATE REVIEW" });
    }

    return res.status(201).send({ message: "SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "FAIL UPLOAD" });
  }
};

exports.findReviews = async (req, res) => {
  try {
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const reviews = await controller.findAllReviews();

    return res.status(200).send(reviews);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET REVIEWS" });
  }
};

exports.findReview = async (req, res) => {
  try {
    const searchId = req.params.reviewId;
    const result = checkJWT(req.headers);
    let editable = false;

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const review = await controller.findOneReview({ id: searchId });

    if (searchId === review.id) {
      editable = true;
    }

    return res.status(200).send([review, { editable }]);
  } catch (err) {
    return res.status(400).send({ message: "FAIL GET REVIEW" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    const review = {
      review_name: req.body.reviewName,
      review_desc: req.body.reviewDesc,
      status: req.body.status,
    };

    if (reviewId) {
      controller.updateReview(review, reviewId);
    }

    return res.status(200).send({ message: "UPDATED REVIEW" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL UPDATE REVIEW" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const result = checkJWT(req.headers);

    if (result === false) {
      return res.status(401).send({ message: "UNSERVICEABLE TOKEN" });
    }

    if (reviewId) {
      controller.deleteReview(reviewId);
    }

    return res.status(200).send({ message: "DELETED REVIEW" });
  } catch (err) {
    return res.status(400).send({ message: "FAIL DELETE REVIEW" });
  }
};
