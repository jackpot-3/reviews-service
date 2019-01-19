const db = require('../../db.js');

const findReviewsQuery = (productId, callback) => {
  const thisQuery = 'SELECT * FROM reviews WHERE product_id = $1';

  db.query(thisQuery, [productId], (error, results) => {
    callback(error, results);
  });
};

const getAverageScoreQuery = (productId, callback) => {
  const thisQuery = 'SELECT score FROM reviews WHERE product_id = $1';
  db.query(thisQuery, [productId], (error, results) => {

    callback(error, results);
  });
};

module.exports = {
  findReviewsQuery,
  getAverageScoreQuery,
};
