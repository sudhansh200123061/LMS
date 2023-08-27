const express = require('express');
const About = require('../models/about');
const router = express.Router();

// Route to display about content on user's page
router.get('/', async (req, res) => {
  console.log('request made to about route');
  try {
    // Fetch the about page content from the database
    const aboutContent = await About.findOne();
    res.render('about', { aboutContent }); // Render the user_about template
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
