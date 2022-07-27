const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const checkAuth = require('../middleware/middleware');
const Post = require('../schema/post');
const Category = require('../schema/category');

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

// posts routes
router.post(
  '/posts',
  checkAuth,
  upload.single('image'),
  async (req, res) => {
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
        const post = await postData.save();
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
  },
);

router.put('/posts/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const options = { new: true };
    const result = await Post.findByIdAndUpdate(
      id,
      updateData,
      options,
    );
    console.log('Updating post, here is the result:', result);
    res.status(200).send(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});
router.delete('/posts/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Post.findByIdAndDelete(id);
    console.log('Deleting post...', data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// categories routes
router.post('/categories', checkAuth, async (req, res) => {
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

router.put('/categories/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const options = { new: true };
    const result = await Category.findByIdAndUpdate(
      id,
      updateData,
      options,
    );
    console.log('Updating category, here is the result', result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.delete('/categories/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndDelete(id);
    console.log('Deleting category...', data);
    res.send('Deleted Category:', data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
