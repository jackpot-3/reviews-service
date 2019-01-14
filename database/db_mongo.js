// model/db.js

// Using a Mongoose Database

const mongoose = require('mongoose');
// var bcrypt = require('bcrypt-nodejs');

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
     USER SCHEMA
  ******************************************** */
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   createdOn: { type: Date, default: Date.now },
//   modifiedOn: Date,
//   lastLogin: Date,
// });

// // methods ======================
// // generating a hash
// // userSchema.methods.generateHash = (password) => {
// //   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// // };

// // // checking if password is valid
// // userSchema.methods.validPassword = (password) => {
// //   return bcrypt.compareSync(password, this.password);
// // };

// // Build the User model
// mongoose.model('User', userSchema);


// /* ********************************************
//      PROJECT SCHEMA
//   ******************************************** */
// const commentSchema = new mongoose.Schema({
//   commentName: { type: String, required: true},
//   name: String,
//   commentDesc: String,
//   createdOn: { type: Date, default: Date.now },
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
//   modifiedOn: Date,
//   assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// const projectSchema = new mongoose.Schema({
//   name: String,
//   projectName: String,
//   createdOn: { type: Date, default: Date.now },
//   modifiedOn: Date,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   // contributors: String,
//   tasks: String,
//   comments: [commentSchema],
// });

// // projectSchema.statics.findByUserID = function (userid, callback) {
// //     this.find(
// //         { createdBy: userid },
// //         '_id projectName createdOn modifiedOn createdBy',
// //         {sort: '-modifiedOn'},
// //         callback);
// // };

// // Build the Project model
// mongoose.model('Project', projectSchema);

exports.model = mongoose;
