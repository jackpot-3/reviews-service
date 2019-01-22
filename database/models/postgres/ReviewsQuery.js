const Redis = require('ioredis');
const db = require('../../db.js');

const redis = new Redis();


const findReviewsQuery = (productId, callback) => {
  const thisQuery = 'SELECT * FROM reviews WHERE product_id = $1';
  redis.get(productId)
    .then((cache) => {
      // console.log('redis returned cache: ', cache);
      if (cache) { callback(null, cache); }
      if (!cache) {
        db.query(thisQuery, [productId], (error, results) => {
          if (!error) {
            redis.set(productId, results);
          }
          callback(error, results);
        });
      }
    }); // then
};

const getAverageScoreQuery = (productId, callback) => {
  const thisQuery = 'SELECT score FROM reviews WHERE product_id = $1';
  redis.get(`score:${productId}`)
    .then((cache) => {
      // console.log('redis returned score:productId cache: ', cache);
      if (cache) { callback(null, cache); }
      if (!cache) {
        db.query(thisQuery, [productId], (error, results) => {
          if (!error) {
            redis.set(productId, results);
          }
          callback(error, results);
        });
      }
    }); // then

  db.query(thisQuery, [productId], (error, results) => {
    callback(error, results);
  });
};

const setReviewQuery = (reviewId, callback) => {
  const thisQuery = 'UPDATE reviews SET found_helpful = found_helpful + 1 WHERE id = $1';
  db.query(thisQuery, [reviewId], (error, results) => {
    callback(error, results);
  });
};

const selectReviews = (reviewId, callback) => {
  const secondQuery = 'SELECT * FROM reviews WHERE id = $1';
  db.query(secondQuery, [reviewId], (error, results) => {
    callback(error, results);
  });
};

const updateReviewQuery = (reviewText, reviewId, callback) => {
  const reviewQuery = 'UPDATE reviews SET review_text = $1 WHERE id = $2;';
  db.query(reviewQuery, [reviewText, reviewId], (error, results) => {
    callback(error, results);
  });
};

const deleteReviewQuery = (reviewId, callback) => {
  const deleteOneReview = 'DELETE FROM reviews WHERE id = $1';
  db.query(deleteOneReview, [reviewId], (error, results) => {
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
