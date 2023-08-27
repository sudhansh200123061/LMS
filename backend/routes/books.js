// routes/book.js

const express = require('express');
const router = express.Router();
const Book = require('../models/books'); // Import the Book schema

// Route to add a new book (admin functionality)
router.post('/add', async (req, res) => {
  try {
    const { title, authors } = req.body;

    // Generate a unique 6-digit code for the book
    const uniqueCode = Math.floor(100000 + Math.random() * 900000);

    // Create a new book object
    const newBook = new Book({
      title,
      authors,
      uniqueCode,
      available: true, // Set the book as available initially
    });

    // Save the new book to the database
    await newBook.save();

    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});
router.get('/', async (req, res) => {
  try {
      const books = await Book.find();
      res.status(200).json(books);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
});
router.delete('/:id', async (req, res) => {
  try {
      const bookId = req.params.id;
      await Book.findByIdAndDelete(bookId);
      res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
  }
});

 


module.exports = router;
