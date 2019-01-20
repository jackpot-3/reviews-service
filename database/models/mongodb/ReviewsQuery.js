const review = require('../../db_mongo.js');

console.log('db :::findReviewsQuery', review);

const findReviewsQuery = (productId, callback) => {
  console.log('findReviewsQuery');
  review.find({ product_id: productId }, { review_text: 1 }, (error, results) => {
    callback(error, results);
  });
};

const getAverageScoreQuery = (productId, callback) => {
  var output = { rows: [] };
  console.log('*** productId ****: ', productId);
  review.find({ product_id: productId }, { score: 1 }, (error, results) => {
    if (!error) console.log('results: ', results);

    output = results.map((item) => {
      const x = { score: item.score };
      return output.rows.push(x);
    });
    console.log('output: ', output);

    callback(error, output);
  });
};

module.exports = {
  findReviewsQuery,
  getAverageScoreQuery,
  // setReviewQuery,
  // selectReviews,
  // updateReviewQuery,
  // deleteReviewQuery,
};
