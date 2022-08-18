/* eslint-disable no-underscore-dangle */
const express = require('express');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const User = require('../../schema/user');

// using sgMail to send emails from server
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const router = express.Router();

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Obtaining all users...');
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.post('/user', async (req, res) => {
  try {
    const [user] = await User.find({
      email: req.body.email.toLowerCase(),
    });
    if (!user) {
      throw Error('User not found, email does not exist');
    }
    const encodedUser = jwt.sign(
      {
        userId: user._id,
        userName: user.username,
      },
      process.env.JWT_KEY,
      {
        expiresIn: '30m', // 30 minutes
      },
    );
    const msg = {
      to: req.body.email,
      from: 'jaguerra@alphaworks.tech',
      subject: 'Reset Password for Socialize App',
      html: `<p>Click this link to reset your password, you will then be prompted to create a new password. You will need this access token to be able to reset your password as well so do not forget it:${encodedUser}</p><a href = "http://localhost:3000/resetPassword" target="_blank">Reset Password</a>`,
    };
    console.log('Sending email to reset password...');
    sgMail.send(msg).then(
      () => {},
      (error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.body);
        }
      },
    );
    res.status(200).json('Check your email to reset password');
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
