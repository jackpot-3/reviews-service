// Self contained generator
const faker = require('faker');
const { Pool } = require('pg');

// const connection = require('./db.js');
const connection = new Pool({
  user: 'bill',
  database: 'bill',
  password: 'black2018',
});

const createProductQuery = 'INSERT INTO products (ID) VALUES ($1)';

for (let i = 1; i <= 100; i += 1) {
  const current = i;
  connection.query(createProductQuery, [current], (err) => {
    if (err) {
      console.log(err);
    }
  });
}

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
    const fakeData = [productId, username, 1, reviewText, score, foundHelpful, title, date];
    connection.query(createReviewQuery, fakeData, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    });
  }
}
