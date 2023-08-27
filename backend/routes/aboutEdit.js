const express = require('express');
const About = require('../models/about');
const router = express.Router();

// Route to render the admin panel for updating about page content
router.get('/', async (req, res) => {
  try {
    // Fetch the current about page content from the database
    const aboutContent = await About.findOne();
    res.render('aboutEdit', { aboutContent }); // Render the edit_about template
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Route to update the about page content
router.post('/', async (req, res) => {
  try {
    const { content } = req.body;

    // Update or create the about page content in the database
    await About.findOneAndUpdate({}, { content }, { upsert: true });

    res.redirect('/aboutEdit'); // Redirect back to the edit page
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
