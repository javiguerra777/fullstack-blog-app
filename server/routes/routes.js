const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const AWS = require('aws-sdk');
const User = require('../schema/user');
const Post = require('../schema/post');
const Category = require('../schema/category');

// salt rounds necessary to make bcrypt work, salt rounds are used for extra protection against hackers
const saltRounds = 10;
const router = express.Router();

// AWS and multer for handling images
// creating the storage variable to upload the file and providing the destination folder
// if nothing is provided in the callback it will get uploaded in the main directory
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, '');
  },
});

// variable is defined to check the type of file which is uploaded
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// defining the upload variable for the configuration of photo being uploaded
const upload = multer({ storage });

// Creating the S3 instance which will be used to upload photos to S3 bucket
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
});

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
    res.status(400).json(err.message);
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
      res.status(404).json({ error: 'password does not match' });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
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
    res.status(400).json(err.message);
  }
});

router.post('/posts', upload.single('image'), async (req, res) => {
  try {
    // check for req.file to see if image exists
    console.log(req.file);
    if (typeof req.file === 'undefined') {
      const postData = new Post({
        username: req.body.username.toLowerCase(),
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        image: req.body.image,
        date: req.body.date,
      });
      const post = postData.save();
      console.log('New Post created in database');
      res.status(200).json(post);
    } else if (typeof req.file !== 'undefined') {
      // if image exists then this post gets made to include the image
      // defining the params variable to upload the photo
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read-write',
        ContentType: 'image/jpeg',
      };

      // uploading the photo using s3 instance and saving the link in the database
      s3.upload(params, (error, data) => {
        if (error) {
          res.status(500).json({ error });
        }
        console.log(data);
        const postData = new Post({
          username: req.body.username.toLowerCase(),
          title: req.body.title,
          body: req.body.body,
          category: req.body.category,
          image: req.body.image,
          date: req.body.date,
        });
        const post = postData.save();
        console.log('New Post created in database');
        res.status(200).json(post);
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// categories routes
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

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
    res.status(400).json(err.message);
  }
});

module.exports = router;
