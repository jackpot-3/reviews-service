// model/db.js

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

const review = mongoose.model('Review', reviewsSchema);

module.exports = review;
