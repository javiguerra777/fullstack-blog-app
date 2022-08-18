const express = require('express');
const User = require('../../schema/user');

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
    console.log('Sending email to reset password...');
    res.status(200).json('Check your email to reset password');
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
