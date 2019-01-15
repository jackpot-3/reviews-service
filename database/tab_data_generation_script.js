console.log('tab seed generator...........................');
const faker = require('faker');
const fs = require('fs');

// const usbMount = `/media/bill/3FE0-6909/`;

// const maxRecords = 10000000; // Max run
const maxRecords = 100;
const maxReviews = 5;

// const maxChunckSize = 100000; // Max run
const maxChunckSize = 1;

let totalRecordCount = 0;


const t0 = new Date().getTime();

let fakeDataRec = '';
let fakeDataRev = '';

console.log('Number of Records');
console.log('Number of Records');
for (let i = 1; i <= maxRecords; i += 1) {
  const current = i;

  const fakeDataRecord = `${current}\r\n`;

  fakeDataRec += fakeDataRecord;

  if ((i % maxChunckSize) === 0) {
    try {
      fs.appendFileSync('products.tsv', fakeDataRec);
      // console.log('The "data to append" was appended to file!');
    } catch (err) {
      console.log('Error writing csv records chunk to file'); /* Handle the error */
    }
    totalRecordCount += maxChunckSize;
    // console.log(totalRecordCount);
    fakeDataRec = '';
  }
}


// const createReviewQuery = 'INSERT INTO reviews (product_id, username, is_verified, review_text, score, found_helpful, title, review_date) VALUES (?,?,?,?,?,?,?,?)';

let reviewsId = 0; // SERIAL
for (let i = 1; i <= maxRecords; i++) {
  // Generate 0 to 10 reviews per product
  const numberOfReviews = maxReviews; // temp replace
  // const id = i;
  for (let j = 0; j < numberOfReviews; j++) {
    
    const fakeDataReviews = `${reviewsId}\t${j}\t${faker.internet.userName()}\t${1}\t${faker.lorem.paragraph(1)}\t${Math.round((Math.random() * 5))}\t${Math.round((Math.random() * 25))}\t${faker.lorem.words(3)}\t${faker.date.between('2010-01-01', '2018-12-1').toISOString()}\n`;
    fakeDataRev += fakeDataReviews;
    reviewsId += 1; // Only increment if write successful
    
    if ((j % maxChunckSize) === 0) {
      try {
        fs.appendFileSync('reviews.tsv', fakeDataRev);
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

console.log(`To write ${maxRecords + (maxRecords * maxReviews)} records the `);
console.log(`Elapsed time: ${((t1 - t0) / 1000)} seconds!`);

process.exit();
