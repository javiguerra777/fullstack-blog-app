/* eslint-disable no-underscore-dangle */
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../schema/user');

// salt rounds necessary to make bcrypt work, salt rounds are used for extra protection against hackers
const saltRounds = 10;
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    let user;
    await bcrypt
      .hash(req.body.password, saltRounds)
      // eslint-disable-next-line consistent-return
      .then(async (hash) => {
        try {
          const data = new User({
            username: req.body.username.toLowerCase(),
            password: hash,
            date: req.body.date,
          });
          user = await data.save();
          console.log(user);
        } catch (err) {
          console.log('repeat user:', err.message);
          throw Error(err.message);
        }
      });
    const encodedUser = jwt.sign(
      {
        ...req.body,
      },
      process.env.JWT_KEY,
    );
    console.log('New User created in database');
    return res.status(200).json(encodedUser);
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const [user] = await User.find({
      username: req.body.username.toLowerCase(),
    });
    if (!user) {
      console.log('user does not exist');
      return res.status(404).json({ error: 'user not found' });
    }
    const bodyPassword = req.body.password;
    // first argument has to be the req.body.password for bcrypt.compare, second argument is the user password
    const compare = await bcrypt.compare(bodyPassword, user.password);
    if (compare) {
      const payload = {
        userId: user.id,
        username: user.username,
      };
      const encodedUser = jwt.sign(payload, process.env.JWT_KEY);
      console.log('user successfully logged in...');
      const userInfo = {
        token: encodedUser,
        username: user.username,
        profileImage: user.image,
        userid: user._id,
      };
      return res.status(200).json(userInfo);
    }
    console.log('Password does not match');
    return res.status(404).json({ error: 'password does not match' });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err.message);
  }
});

module.exports = router;