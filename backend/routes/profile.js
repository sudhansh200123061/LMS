const express = require('express');
const User = require('../models/auth');
const router = express.Router();

router.get('/:email', async (req, res) => {
    try {
      const email = req.params.email;
      const user = await User.findOne({ email });  
      if (!user) {
        console.log('user not found');
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
        console.log('error occurred');
      res.status(500).json({ error: 'An error occurred' });

    }
  });

router.post('/update', async (req, res) => {
    try {
      const { email, name } = req.body;
      console.log(email);
      const user = await User.findOne({ email});
      if (!user) {
        console.log('user not found');
        return res.status(404).json({ message: 'User not found' });
      }
      user.name = name;
      await user.save();
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  module.exports = router;

  