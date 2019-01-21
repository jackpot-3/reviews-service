const review = require('../../db_mongo.js');

// console.log('db :::findReviewsQuery', review);

const findReviewsQuery = (productId, callback) => {
  // console.log('findReviewsQuery');
  review.find({ product_id: productId }, { review_text: 1 }, (error, results) => {
    callback(error, results);
  });
};

const getAverageScoreQuery = (productId, callback) => {
  var output = { rows: [] };
  // console.log('*** productId ****: ', productId);
  review.find({ product_id: productId }, { score: 1 }, (error, results) => {
    if (!error) console.log('results: ', results);

    output = results.map((item) => {
      const x = { score: item.score };
      return output.rows.push(x);
    });
    // console.log('output: ', output);

    callback(error, output);
  });
};

const setReviewQuery = (reviewId, callback) => {
  review.updateOne({ id: reviewId }, { $inc: { found_helpful: 1 } }, (error, results) => {
    callback(error, results);
  });
};

const selectReviews = (reviewId, callback) => {
  review.find({ id: reviewId }, (error, results) => {
    callback(error, results);
  });
};

const updateReviewQuery = (reviewText, reviewId, callback) => {
  review.update({ id: reviewId }, { $set: { review_text: reviewText } }, (error, results) => {
    callback(error, results);
  });
};

const deleteReviewQuery = (reviewId, callback) => {
  review.deleteOne({ id: reviewId }, (error, results) => {
    callback(error, results);
  });
};

module.exports = {
  findReviewsQuery,
  getAverageScoreQuery,
  setReviewQuery,
  selectReviews,
  updateReviewQuery,
  deleteReviewQuery,
};
