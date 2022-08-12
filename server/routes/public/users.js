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

module.exports = router;
