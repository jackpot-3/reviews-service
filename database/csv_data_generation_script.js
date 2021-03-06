console.log('csv seed generator');
const faker = require('faker');
const fs = require('fs');

// const usbMount = `/media/bill/3FE0-6909/`;

const maxRecords = 10000000; // TURN ON
// const maxRecords = 100; // TURN OFF
const maxReviews = 5; // TURN ON

const maxChunckSize = 1000000; // TURN ON
// const maxChunckSize = 10;  // TURN OFF

const t0 = new Date().getTime();

let fakeDataRec = '';
let fakeDataRev = '';

console.log('Number of Records');
for (let i = 1; i <= maxRecords; i += 1) {
  const current = i;

  const fakeDataRecord = `${current}\n`;

  fakeDataRec += fakeDataRecord;

  if ((i % maxChunckSize) === 0) {
    try {
      fs.appendFileSync('products.csv', fakeDataRec);
      // console.log('The "data to append" was appended to file!');
    } catch (err) {
      console.log('Error writing csv records chunk to file'); /* Handle the error */
    }
    // totalRecordCount += maxChunckSize;
    // console.log(totalRecordCount);
    fakeDataRec = '';
  }
}

// const createReviewQuery = 'INSERT INTO reviews (product_id, username, is_verified, review_text, score, found_helpful, title, review_date) VALUES (?,?,?,?,?,?,?,?)';
let reviewId = 0;
for (let i = 1; i <= maxRecords; i += 1) {
  // Generate 0 to 10 reviews per product
  const numberOfReviews = maxReviews; // temp replace
  for (let j = 0; j < numberOfReviews; j += 1) {
    const productId = i;
    // const username = `${faker.internet.userName()}`;
    const username = `${faker.internet.userName()}${i}${j}`;
    const reviewText = faker.lorem.paragraph(1);
    const foundHelpful = Math.round((Math.random() * 25));
    const score = Math.round((Math.random() * 5).toFixed(1));
    const title = faker.lorem.words(3);
    
    const date = faker.date.between('2010-01-01', '2018-12-1').toISOString();
    let fakeDataReviews = [reviewId, productId, username, 1, reviewText, score, foundHelpful, title, date];
    fakeDataReviews.join(',');
    fakeDataReviews = `${fakeDataReviews}\r\n`;

    fakeDataRev += fakeDataReviews;
    reviewId += 1;
    if ((j % maxChunckSize) === 0) {
      try {
        fs.appendFileSync('reviews.csv', fakeDataRev);
        // console.log('The "data to append" was appended to file!');
      } catch (err) {
        console.log('Error writing csv reviews chunk to file')/* Handle the error */
      }

      // totalRecordCount += maxChunckSize;
      // console.log(totalRecordCount);
      fakeDataRev = '';
    }
  }
}

const t1 = new Date().getTime();

console.log(`To write ${(maxRecords * maxReviews)} records the `);
console.log(`Elapsed time: ${((t1 - t0) / 1000)} seconds!`);
console.log(`Elapsed time: ${(((t1 - t0) / 1000) / 60).toFixed(2)} minutes!!!`);

process.exit();
