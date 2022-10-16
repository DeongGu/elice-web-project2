import db from "../models";

exports.createReview = (newReview) => {
  try {
    db.review.create(newReview);
    return true;
  } catch (err) {
    console.error(err.message);

    return false;
  }
};

exports.findOneReview = (data) => {
  try {
    return db.review.findOne({
      where: data,
    });
  } catch (err) {
    throw err;
  }
};

exports.findAllReviews = () => {
  try {
    return db.review.findAll();
  } catch (err) {
    throw err;
  }
};

exports.updateReview = (updateReview, id) => {
  try {
    db.review.update(updateReview, {
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};

exports.deleteReview = (id) => {
  try {
    db.review.destroy({
      where: { id: id },
    });

    return true;
  } catch (err) {
    return false;
  }
};
