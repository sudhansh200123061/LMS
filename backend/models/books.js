// models/book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: [String],
    required: true,
  },
  uniqueCode: {
    type: Number,
    required: true,
    unique: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
