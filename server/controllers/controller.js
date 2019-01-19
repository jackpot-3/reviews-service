const db = require('../../database/db.js');
const modelQueries = require('../../database/models/postgres/ReviewsQuery.js');
// const findReviewsQuery = require('../../database/models/postgres/ReviewsQuery.js');
// const getAverageScore = require('../../database/models/postgres/ReviewsQuery.js');

// /reviews/all /: productid
const findReviews = (req, res) => {
  console.log('*** findReviews ***');
  const productId = req.params.productid;
  console.log('productId: ', productId);
  // 'const thisQuery = 'SELECT * FROM reviews WHERE product_id = $1';

  modelQueries.findReviewsQuery(productId, (error, results) => {
    if (error) {
      console.log('Error: ', error);
      res.send(error);
    } else {
      res.send(results);
    }
  });
};

// /reviews/average /: productid
const getAverageScore = (req, res) => {
  const productId = +req.params.productid;
  // const thisQuery = 'SELECT score FROM reviews WHERE product_id = $1';
  
  modelQueries.getAverageScoreQuery(productId, (error, results) => {
    if (error) {
      console.log('Error: ', error);
      res.send(error);
    } else {
      let totalScore = 0;
      for (let i = 0; i < results.rows.length; i += 1) {
        let temp = {};
        temp = results.rows[i];
        totalScore += temp.score;
      }
      const average = totalScore / results.rows.length;
      const responseObject = {
        averageScore: average,
        totalReviews: results.length,
      };
      res.send(responseObject);
    }
  });
};

// /reviews/helpful /: reviewId
const setReview = (req, res) => {
  const reviewId = req.params.reviewId;
  console.log('reviewId', reviewId);
  // const thisQuery = 'UPDATE reviews SET found_helpful = found_helpful + 1 WHERE id = $1';
  console.log('post recieved');

  modelQueries.setReviewQuery(reviewId, (err, setResults) => {
    if (err) {
      res.send(err);
    } else {
      modelQueries.selectReviews(reviewId, (error, results) => {
        if (error) {
          res.send(error);
        } else {
          res.send(results);
        }
      });
    }
  });

};

// /reviews/: reviewId /: reviewText
const updateReview =  (req, res) => {
  const { reviewId } = req.params;
  const { reviewText } = req.params;
  // const reviewQuery = 'UPDATE reviews SET review_text = $1 WHERE id = $2;';
  console.log('used PUT Review updated', reviewText);
  
  modelQueries.updateReviewQuery(reviewText, reviewId, (error, results) => {
    if (error) {
      console.log('Error:', error);
      res.send(error);
    } else {
      console.log('used PUT Review updated with results', results);
      res.send(results);
    }
  });
  // db.query(reviewQuery, [reviewText, reviewId], (error, results) => {
  // });
};

// /reviews/: reviewId
const deleteReview = (req, res) => {
  const { reviewId } = req.params;
  console.log('reviewId: ', reviewId);
  // const deleteReviewQuery = 'DELETE FROM reviews WHERE id = $1';

  modelQueries.deleteReviewQuery(reviewId, (error, result) => {
    if (error) {
      console.log('Error: ', error);
      res.send(error);
    } else {
      console.log('You have deleted a review');
      res.send(result);
    }
  });

  // db.query(deleteReviewQuery, [reviewId], (error, response) => {
  //   if (error) {
  //     console.log('Error: ', error);
  //   } else {
  //     console.log('You have deleted a review');
  //     res.send(response);
  //   }
  // });
};

module.exports = {
  findReviews,
  setReview,
  updateReview,
  getAverageScore,
  deleteReview,
};
