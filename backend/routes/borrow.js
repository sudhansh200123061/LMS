const express=require('express')
const router=express.Router()
const Book=require('../models/books')
const User=require('../models/auth')
const { requireAuth } = require('./login');

router.post('/:userEmail/:bookID', async (req, res) => {
    console.log("in borrow route");
  try {
    const userEmail = req.params.userEmail;
    const bookCode = req.params.bookID;

    const user = await User.findOne({ email: userEmail });
    const book = await Book.findOne({ uniqueCode: bookCode });

    if (!user || !book) {
      return res.status(404).json({ message: 'User or book not found' });
    }

    if (!book.available) {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }

    // Update book availability status and add to user's issuedBooks
    book.available = false;
    user.issuedBooks.push({
      bookID: book._id,
      issueDate: new Date(),
      returned: false,
    });

    await Promise.all([book.save(), user.save()]);

    return res.status(200).json({ message: 'Book borrowed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
module.exports = router;
