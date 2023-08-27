// routes/adm_login.js
const express = require('express');
const Admin = require('../models/admin');
const router = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

// Set up cookie-session middleware
router.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
  })
);

// Middleware to check authentication
const requireAdminAuth = (req, res, next) => {
  if (!req.session.adminAuthenticated) {
    return res.redirect('/adm_login'); // Redirect to admin login page if not authenticated
  }
  next();
};
// Admin login route
router.post('/adm_login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the admin by username
      const admin = await Admin.findOne({ email });
  
      if (!admin) {
        return res.status(401).json({ error: 'Authentication failed' });
      }
  
      // Compare the provided password with the hashed password
      const passwordMatch = await bcrypt.compare(password, admin.password);
  
      if (passwordMatch) {
        req.session.adminAuthenticated = true;
        //render admin dashboard
        res.redirect('/admin_dashboard');      
        return res.status(200);
      } else {
        return res.status(401).json({ error: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

// Export the router
module.exports = { router, requireAdminAuth };
