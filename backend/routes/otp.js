//routes/borrow.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
var lastOTPtime = 0;
var lastOTP=11111;
require('dotenv').config();
const gmailpassword = process.env.gmail_password;
router.post('/send-otp/', (req, res) => {
    const randomOTP = Math.floor(10000 + Math.random() * 90000); // Generates OTP between 10000 and 99999
    lastOTP=randomOTP;
    const userEmailAddress = req.body.userEmail;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'aman.music420@gmail.com',
          pass: gmailpassword
        }
    });

    const mailOptions = {
        from: 'aman.music420@gmail.com',
        to: userEmailAddress,
        subject: 'OTP Verification',
        text: `Your OTP is: ${randomOTP}`
    };
    if(Date.now() - lastOTPtime < 180000) {
        res.json({ success: false, message: 'Please wait for 3 minutes before sending another OTP.' });
        return;
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            res.json({ success: false, message: 'Some error occurred while sending OTP. Please try again.'});
        } else {
            lastOTPtime = Date.now();
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'OTP sent successfully. Valid for 5 minutes.' });
        }
    });
});

router.post('/verify-otp/', (req, res) => {
    const otp = req.body.enteredOTP;
    if(Date.now() - lastOTPtime > 300000) {
        res.json({ success: false, message: 'Either otp not generated or expired. Please generate a new OTP.' });
        return;
    }
    if(otp == lastOTP) {
        res.json({ success: true, message: 'OTP verified successfully.' });
    } else {
        res.json({ success: false, message: 'Incorrect OTP. Please try again.' });
    }
});





  
module.exports = router;