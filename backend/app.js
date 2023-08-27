const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const User = require('./models/auth.js');
const Admin = require('./models/admin.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const path = require('path');
app.set('views', path.join(__dirname, '../frontend', 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../frontend', 'public')));
const authRouter = require('./routes/signup'); // Import the signup router
const {requireAuth, loginRouter} = require('./routes/login');
const newAdminRouter = require('./routes/adm_signup'); // Import the signup router
const aboutRouter = require('./routes/aboutEdit');
const { router: admLoginRouter, requireAdminAuth } = require('./routes/adm_login');
const bookRouter = require('./routes/books');
const userRouter = require('./routes/about'); // Import the user route
const profileRouter = require('./routes/profile'); // Import the profile route
const userbooksRouter = require('./routes/userbooks'); // Import the userbooks route
const otpRouter = require('./routes/otp.js');
const borrowRouter = require('./routes/borrow.js');
app.use(
  cookieSession({
    name: 'session',
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // Session expiration time in milliseconds (1 day)
  })
);
app.use('/auth', admLoginRouter);
app.use('/auth', authRouter);
app.use('/auth', loginRouter);
app.use('/auth', newAdminRouter);
app.use('/books',requireAdminAuth, bookRouter);
app.use('/aboutEdit',requireAdminAuth, aboutRouter);
app.use('/about', userRouter);
app.use('/profile', profileRouter);
app.use('/userbooks', userbooksRouter);
app.use('/otp', otpRouter);
app.use('/bookBorrow', borrowRouter);


const connectToDatabase = require('./config/database'); // Import the function
connectToDatabase();

app.get('/', (req, res) => {
  res.render('index');
});
app.get('/signup', (req, res) => {
    res.render('signup');
  });
  

  app.get('/login', (req, res) => {
    req.session.adminAuthenticated = false; //if user logins admin should be logged out
    if(req.session.authenticated) {
      res.redirect('/user_dashboard');
    } else {
    res.render('login');
    } // Render the login template

  });
  app.get('/logout', (req, res) => {
    req.session.authenticated = false; 
    res.redirect('/'); 
  });
  
  app.get('/adm_login', (req, res) => {
    req.session.authenticated = false; //if admin logins user should be logged out
    if(req.session.adminAuthenticated) {
      res.redirect('/admin_dashboard');
    } else {
    res.render('adm_login');
    } // Render the login template
  });
app.get('/adm_logout', (req, res) => {
  req.session.adminAuthenticated = false;
  res.redirect('/');
});

 app.get('/adm_signup', requireAdminAuth, (req, res) => {
    res.render('adm_signup'); // Render the login template
  });
  

  app.get('/admin_dashboard', requireAdminAuth, (req, res) => {
    // This route is protected and can only be accessed by authenticated admin
    res.render('admin_dashboard');
  });
  app.get('/user_dashboard', requireAuth, (req, res) => {
    //render user dashboard and pass the userid
    res.render('user_dashboard', {userEmail: req.session.userEmail});
  });


app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/aboutEdit', requireAdminAuth, (req, res) => {
  res.render('aboutEdit');
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/'); 
});
app.get('/manage_catalog',requireAdminAuth, (req, res) => {
  res.render('manage_catalog');
});
app.get('/catalog', (req, res) => {
  res.render('catalog');
});

app.get('/borrow/:uniqueCode',requireAuth, (req, res) => {
  const { uniqueCode } = req.params;
    res.render('borrow', { uniqueCode, userEmail: req.session.userEmail });
});
const ipAddress = "10.12.9.7";
const PORT = process.env.PORT || 3000;
app.listen(PORT, ipAddress, () => {
  console.log(`Server started on http://${ipAddress}:${PORT}`);
});

