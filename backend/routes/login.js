// routes/login.js
const express = require('express');
const User = require('../models/auth');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
// Log-in route
loginRouter.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
  })
);
const requireAuth = (req, res, next) => {
  if (!req.session.authenticated) {
    return res.redirect('/login'); // Redirect to login page if not authenticated
  }
  next();
};

const userLogout = (req, res, next) => {
  if (!req.session.authenticated) {
    return res.redirect('/login'); // Redirect to login page if not authenticated
  }
  next();
};

loginRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    // If user doesn't exist or password is incorrect
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Set session data upon successful login
    req.session.authenticated = true;
    req.session.userId = user.id; // Store user ID or other relevant data
    req.session.userEmail = user.email;
    console.log('logged in with', req.session.userEmail);
    res.redirect('/user_dashboard'); // Redirect to dashboard page on successful login
    res.status(200);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = {loginRouter, requireAuth};
