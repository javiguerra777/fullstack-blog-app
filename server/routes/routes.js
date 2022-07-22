const express = require('express');
const bcrypt = require('bcrypt');

const saltRounds = 10;
const router = express.Router();

router.get('/signup', (req, res) => {
  const data = req.body;
  const { user, password } = data;
  console.log('User is:', user);
  bcrypt.genSalt(saltRounds, (error, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      console.log('User password is:', hash);
    });
  });
  res.status(200).send('User is created');
});

module.exports = router;
