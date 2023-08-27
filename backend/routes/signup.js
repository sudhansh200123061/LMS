const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/auth');
const router = express.Router();

// Sign-up route
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    res.status(201).json({ message: 'User signed up successfully' });
  } catch (error) {
    
    res.status(500).json({ error: 'An error occurred', error });
  }
});

module.exports = router;
