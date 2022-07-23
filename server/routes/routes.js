const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const Post = require('../schema/post');

const saltRounds = 10;
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    let user;
    await bcrypt
      .hash(req.body.password, saltRounds)
      .then(async (hash) => {
        try {
          const data = new User({
            username: req.body.username,
            password: hash,
          });
          user = await data.save();
          console.log(user);
        } catch (err) {
          console.log(err.message);
        }
      });
    const encodedUser = jwt.sign(
      {
        userId: user.insertId,
        ...req.body,
      },
      process.env.JWT_KEY,
    );
    console.log('New User created in database');
    res.status(200).json(encodedUser);
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log('login route works');

    res.status(200).json(req.body);
  } catch (err) {
    console.log(err.message);
  }
});
router.get('/posts', async (req, res) => {
  console.log('Getting all posts...');
});
router.post('/posts', async (req, res) => {
  try {
    const data = new Post({
      username: req.body.username,
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      date: req.body.date,
    });
    const postedData = await data.save();
    console.log('New Post created in database');
    res.status(200).json(postedData);
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
