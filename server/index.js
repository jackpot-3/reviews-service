require('newrelic');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const controller = require('./controllers/controller');

const port = 3001;

const app = express();

app.use(morgan('dev'));
// app.use('/:productid', express.static(path.join(__dirname, '../public')));

app.use(bodyParser());

app.get('/reviews/all/:productid', controller.findReviews);

app.get('/reviews/average/:productid', controller.getAverageScore);

app.post('/reviews/helpful/:reviewId', controller.setReview);

app.put('/reviews/:reviewId/:reviewText', controller.updateReview);

app.delete('/reviews/:reviewId', controller.deleteReview);

app.listen(port, () => {
  console.log(`listening on port + ${port}`);
});
