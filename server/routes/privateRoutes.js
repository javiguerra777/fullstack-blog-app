const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { Buffer } = require('buffer/');
const checkAuth = require('../middleware/middleware');
const Post = require('../schema/post');
const Category = require('../schema/category');
const Comment = require('../schema/comment');
const User = require('../schema/user');

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
// upload file from the frontend
router.post(
  '/posts',
  checkAuth,
  upload.single('image'),
  async (req, res) => {
    try {
      // check for req.file to see if image exists
      console.log('body', req.body);
      console.log('file:', req.file);
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
        console.log(
          'New Post created in database, no image was sent',
        );
        res.status(200).json(post);
      } else if (typeof req.file !== 'undefined') {
        // if image exists then this post gets made to include the image
        // defining the params variable to upload the photo
        console.log('file exists');
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
            console.log(error);
            return res.status(400).json({ error });
          }
          console.log(data);
          const postData = new Post({
            username: req.body.username.toLowerCase(),
            title: req.body.title,
            body: req.body.body,
            category: req.body.category,
            image: data.Location,
            date: req.body.date,
          });
          const post = postData.save();
          console.log('New Post created in database');
          return res.status(200).json(post);
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
  },
);

// adds like to likes array in mongoDB
router.put('/likepost/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndUpdate(id, {
      $push: { likes: req.body.uniqueUserId },
    });
    console.log('adding like to post, here are the results:', result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});
// removes like from likes array in mongoDB
router.put('/unlikepost/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { likes: req.body.uniqueUserId },
    });
    console.log(
      'removing like from post, here are the results:',
      result,
    );
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});
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
    const deletedComments = await Comment.deleteMany({ postId: id });
    console.log('Deleting post...', data);
    console.log('Deleting comments...', deletedComments);
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

// upload webcam image route
router.post('/image', checkAuth, async (req, res) => {
  try {
    // use Buffer to convert text to base64 to upload to AWS
    const buf = Buffer.from(
      req.body.image.replace(/^data:image\/\w+;base64,/, ''),
      'base64',
    );
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.body.imageKey,
      Body: buf,
      ACL: 'public-read-write',
      ContentEncoding: 'base64',
      ContentType: 'image/jpeg',
    };
    s3.upload(params, (error, data) => {
      if (error) {
        console.log(error);
        return res.status(400).json({ error });
      }
      console.log(data);
      const postData = new Post({
        username: req.body.username.toLowerCase(),
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        image: data.Location,
        date: req.body.date,
      });
      const post = postData.save();
      console.log('New Post created in database');
      return res.status(200).json(post);
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// update user profile routes

router.put('/updateusername', checkAuth, async (req, res) => {
  // also update the JWT if username is successfully changed
  try {
    console.log(req.body.id);
    await User.findByIdAndUpdate(req.body.id, {
      username: req.body.newusername.toLowerCase(),
    });
    res.status(200).json('username changed successfully');
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.put('/updatepassword', checkAuth, (req, res) => {
  console.log(req.body);
});

router.put('/updateprofilepicture', checkAuth, (req, res) => {
  console.log(req.body);
});

module.exports = router;
