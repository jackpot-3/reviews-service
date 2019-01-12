
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/db.js');

const port = 3001;
// const Cors = require('cors');

const app = express();

// app.use(Cors());
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

app.post('/reviews/',(res, req) => {

});

app.listen(port, () => {
  console.log(`listening on port + ${port}`);
});
