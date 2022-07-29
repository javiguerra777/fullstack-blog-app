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
      return res.status(200).json(encodedUser);
    }
    console.log('Password does not match');
    return res.status(404).json({ error: 'password does not match' });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err.message);
  }
});

// posts routes
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    console.log('Obtaining all posts');
    res.status(200).json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findById(id);
    console.log('Grabbing post by id, here is the result', result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.get('/filteredpost', async (req, res) => {
  try {
    const { category } = req.body;
    const data = await Post.find({
      category: category.toLowerCase(),
    });
    console.log(data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json(err.message);
  }
});

// categories routes
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Obtaining all categories');
    res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    console.log('Obtaining all users...');
    res.status(200).json(users);
  } catch (err) {
    console.log(err.message);
    res.status.json(err.message);
  }
});

module.exports = router;
