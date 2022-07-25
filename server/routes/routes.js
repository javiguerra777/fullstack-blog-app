const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schema/user');
const Post = require('../schema/post');
const Category = require('../schema/category');

// salt rounds necessary to make bcrypt work, salt rounds are used for extra protection against hackers
const saltRounds = 10;
const router = express.Router();

// public endpoints
router.post('/signup', async (req, res) => {
  try {
    let user;
    await bcrypt
      .hash(req.body.password, saltRounds)
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
          console.log(err.message);
          res.status(400).json(err.message);
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
    const [user] = await User.find({
      username: req.body.username.toLowerCase(),
    });
    if (!user) {
      console.log('user does not exist');
      res.status(404).json({ error: 'user not found' });
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
      res.status(200).json(encodedUser);
    } else {
      res.status(400).json({ error: 'password does not match' });
    }
  } catch (err) {
    console.log(err.message);
  }
});

// middleware

// input middleware here

// private endpoints, where a user has to be authenticated to hit these endpoints

// posts routes
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
  }
});

router.post('/posts', async (req, res) => {
  try {
    const data = new Post({
      username: req.body.username.toLowerCase(),
      title: req.body.title,
      body: req.body.body,
      category: req.body.category,
      date: req.body.date,
    });
    const post = await data.save();
    console.log('New Post created in database');
    res.status(200).json(post);
  } catch (err) {
    console.log(err.message);
  }
});

// categories routes
router.post('/categories', async (req, res) => {
  try {
    const data = new Category({
      category: req.body.category,
      username: req.body.username.toLowerCase(),
      date: req.body.date,
    });
    const category = await data.save();
    console.log('New category created');
    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
