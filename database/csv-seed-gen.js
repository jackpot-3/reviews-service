console.log('csv seed generator');
const faker = require('faker');
const fs = require('fs');

const maxRecords = 5;
const maxReviews = 2;
// const connection = require('./db.js');

const createProductQuery = 'INSERT INTO products (ID) VALUES (?)';

for (let i = 1; i <=  maxRecords; i += 1) {
  const current = i;

  // console.log('record: ' + current);
  
  let fakeData = current + '\r\n';
  console.log('fakeData: ' + fakeData);

  try {
    fs.appendFileSync('records.txt', fakeData);
    // console.log('The "data to append" was appended to file!');
  } catch (err) {
    console.log('Error writing csv records chunk to file') /* Handle the error */
  }
  // connection.query(createProductQuery, [current], (err) => {
  //   if (err) {
  //     console.log(err);
  //   }
  // });
}

// const createReviewQuery = 'INSERT INTO reviews (product_id, username, is_verified, review_text, score, found_helpful, title, review_date) VALUES (?,?,?,?,?,?,?,?)';

for (let i = 1; i <=  maxRecords; i++) {
  // Generate 0 to 10 reviews per product 
  const numberOfReviews = maxReviews; // temp replace
  for (let j = 0; j < numberOfReviews; j++) {
    const productId = i;
    const username = faker.internet.userName();
    const reviewText = faker.lorem.paragraph(1);
    const foundHelpful = Math.round((Math.random() * 25));
    const score = (Math.random() * 5).toFixed(1);
    const title = faker.lorem.words(3);
    
    const date = faker.date.between('2010-01-01', '2018-12-1');
    let fakeData = [productId, username, 1, reviewText, score, foundHelpful, title, date];
    fakeData.join(',');
    fakeData = fakeData + '\r\n';

    console.log('fakeData: ', fakeData);
    
    // console.log('Product no: ' + productId + ' Review no: ' + j);
    
    try {
      fs.appendFileSync('reviews.txt', fakeData);
      // console.log('The "data to append" was appended to file!');
    } catch (err) {
      console.log('Error writing csv reviews chunk to file')/* Handle the error */
    }
    // connection.query(createReviewQuery, fakeData, (err) => {
    //   if (err) {
    //     // eslint-disable-next-line no-console
    //     console.log(err);
    //   }
    // });
  }
}

