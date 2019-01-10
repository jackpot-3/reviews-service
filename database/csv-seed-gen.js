console.log('csv seed generator');
const faker = require('faker');
const fs = require('fs');

const usbMount = `/media/bill/3FE0-6909/`;

const maxRecords = 10000000;
const maxReviews = 10;

const maxChunckSize = 10000;

const t0 = new Date().getTime();

let fakeDataRec = '';
let fakeDataRev = '';

for (let i = 1; i <=  maxRecords; i += 1) {
  const current = i;

  const fakeDataRecord = `${current}\r\n`;

  fakeDataRec += fakeDataRecord;

  if (i % maxChunckSize === 0) {
    try {
      fs.appendFileSync(`${usbMount}records.txt`, fakeDataRec);
      // console.log('The "data to append" was appended to file!');
    } catch (err) {
      console.log('Error writing csv records chunk to file'); /* Handle the error */
    }

    fakeDataRec = '';
  }
}

// const createReviewQuery = 'INSERT INTO reviews (product_id, username, is_verified, review_text, score, found_helpful, title, review_date) VALUES (?,?,?,?,?,?,?,?)';

for (let i = 1; i <= maxRecords; i++) {
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
    let fakeDataReviews = [productId, username, 1, reviewText, score, foundHelpful, title, date];
    fakeDataReviews.join(',');
    fakeDataReviews = `${fakeDataReviews}\r\n`;

    // console.log('fakeData: ', fakeData);
    
    fakeDataRev += fakeDataReviews;

    if (j % maxChunckSize === 0) {
      try {
        fs.appendFileSync(`${usbMount}reviews.txt`, fakeDataRev);
        // console.log('The "data to append" was appended to file!');
      } catch (err) {
        console.log('Error writing csv reviews chunk to file')/* Handle the error */
      }

      fakeDataRev = '';
    }
  }
}

const t1 = new Date().getTime();
console.log(`To write ${maxRecords * maxReviews} records the `);
console.log(`Elapsed time: ${((t1 - t0) / 1000)} seconds!`);