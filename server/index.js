
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/db.js');
const morgan = require('morgan');

const port = 3001;
// const Cors = require('cors');

const app = express();

// app.use(Cors());\
app.use(morgan('dev'));
app.use('/:productid', express.static(path.join(__dirname, '../public')));

app.use(bodyParser());

app.get('/reviews/all/:productid', (req, res) => {
  const productId = req.params.productid;
  const thisQuery = 'SELECT * FROM reviews WHERE product_id = ?';
  db.query(thisQuery, [productId], (error, results) => {
    if (error) {
      res.send(error);
    } else {
      res.send(results);
    }
  });
});

app.get('/reviews/average/:productid', (req, res) => {
  const productId = req.params.productid;
  const thisQuery = 'SELECT * FROM reviews WHERE product_id = ?';
  
  db.query(thisQuery, [productId], (error, results) => {
    if (error) {
      res.send(error);
    } else {
      let totalScore = 0;
      for (let i = 0; i < results.length; i++) {
        totalScore += results[i].score;
      }
      const average = totalScore / results.length;
      const responseObject = {
        'averageScore': average,
        'totalReviews': results.length
      }
      res.send(responseObject);
    }
  });
});

app.post('/reviews/helpful/:reviewId', (req, res) => {
  const thisId = req.params.reviewId;
  const thisQuery = 'UPDATE reviews SET found_helpful = found_helpful + 1 WHERE id = ?';
  console.log('post recieved');
  db.query(thisQuery, [thisId], (err) => {
    if (err) {
      res.send(err);
    } else {
      const secondQuery = 'SELECT * FROM reviews WHERE id = ?';
      db.query(secondQuery, [thisId], (error, results) => {
        if (error) {
          res.send(error);
        } else {
          res.send(results);
        }
      });
    }
  });
});

app.put('/reviews/:reviewId/:reviewText', (req, res) => {
  const { reviewId } = req.params;
  const { reviewText } = req.params;
  
  const reviewQuery = 'UPDATE reviews SET review_text = $1 WHERE id = $2;';
  console.log('used PUT Review updated');
  
  db.query(reviewQuery, [reviewText, reviewId], (error, results) => {
    if (error) {
      console.log('Error:', error);
      res.send(error);
    } else {
      console.log('used PUT Review updated with results', results);
      res.send(results);
    }
  });
});

app.delete('/reviews/:reviewId', (req, res) => {
  const { reviewId } = req.params;
  console.log('reviewId: ', reviewId);
  const deleteReviewQuery = 'DELETE FROM reviews WHERE id = $1';

  db.query(deleteReviewQuery, [reviewId], (error, response) => {
    if (error) {
      console.log('Error: ', error);
    } else {
      console.log('You have deleted a review');
      res.send(response);
    }
  });
});

app.listen(port, () => {
  console.log(`listening on port + ${port}`);
});
