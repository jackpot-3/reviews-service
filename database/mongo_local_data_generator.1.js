// Self contained generator
const faker = require('faker');
// const { Pool } = require('pg');

// const connection = require('./db.js');
// Using a Mongoose Database

const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/amz_db';
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/* ********************************************
 *   Reviews SCHEMA
***********************************************
*/
const reviewsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  username: { type: String, unique: true, required: true },
  is_verified: { type: Number, required: true },
  review_text: { type: String },
  score: { type: Number },
  found_helpful: { type: Number },
  title: { type: String },
  createdOn: { type: Date, default: Date.now },
});

mongoose.model('Reviews', reviewsSchema);


// for (let i = 1; i <= 100; i += 1) {
//   const current = i;
//   connection.query(createProductQuery, [current], (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// }

const createReviewQuery = 'INSERT INTO reviews (product_id, username, is_verified, review_text, score, found_helpful, title, review_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)';

for (let i = 1; i <= 100; i++) {
  for (let j = 0; j < 10; j++) {
    const productId = i;
    const username = faker.internet.userName();
    const reviewText = faker.lorem.paragraph(1);
    const foundHelpful = Math.round((Math.random() * 25));
    const score = Math.round((Math.random() * 5).toFixed(1));
    const title = faker.lorem.words(3);
    
    const date = faker.date.between('2010-01-01', '2018-12-1');
    const fakeData = [{
      id, 
      product_id: productId,
      username,
      is_verified: 1,
      review_text: reviewText,
      score,
      found_helpful: foundHelpful, 
      title,review_date: date}];
    connection.query(createReviewQuery, fakeData, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
}

// exports.model = mongoose;

process.exit();
