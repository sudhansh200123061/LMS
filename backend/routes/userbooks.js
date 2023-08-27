// routes/book.js
const express = require('express');
const router = express.Router();
const Book = require('../models/books'); // Import the Book schema



router.get('/', async (req, res) => {
  try {
      const books = await Book.find();
      res.status(200).json(books);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
});




module.exports = router;