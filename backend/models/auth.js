// auth.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  bookID: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    required: true,
  },
  returned: {
    type: Boolean,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  issuedBooks: [bookSchema], // Array of issued books
});

// Create and export User model
module.exports = mongoose.model('User', userSchema);
