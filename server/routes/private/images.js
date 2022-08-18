const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer'); // to help with partial forms and files
const { Buffer } = require('buffer/');
const checkAuth = require('../../middleware/middleware');
const User = require('../../schema/user');
const Post = require('../../schema/post');
const Comment = require('../../schema/comment');

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
      if (
        !req.body.username ||
        !req.body.title ||
        !req.body.date ||
        !req.body.profilepicture
      ) {
        console.log('invalid request');
        return res.status(400).json('send a valid request');
      }
      if (typeof req.file === 'undefined') {
        const postData = new Post({
          username: req.body.username.toLowerCase(),
          title: req.body.title,
          body: req.body.body,
          category: req.body.category,
          image: req.body.image,
          date: req.body.date,
          profilepicture: req.body.profilepicture,
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
        s3.upload(params, async (error, data) => {
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
            profilepicture: req.body.profilepicture,
          });
          const post = await postData.save();
          console.log('New Post created in database');
          return res.status(200).json(post);
        });
      }
    } catch (err) {
      console.log(err.message);
      res.status(400).json(err.message);
    }
    return true;
  },
);

// upload webcam image route
router.post('/image', checkAuth, async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.title ||
      !req.body.date ||
      !req.body.profilepicture
    ) {
      console.log('invalid request');
      return res.status(400).json('send a valid request');
    }
    if (!req.body.image) {
      console.log('invalid photo option');
      return res.status(400).json('please upload valid image');
    }
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
    s3.upload(params, async (error, data) => {
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
        profilepicture: req.body.profilepicture,
      });
      const post = await postData.save();
      console.log('New Post created in database');
      return res.status(200).json(post);
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err.message);
  }
  return true;
});

router.put(
  '/updateprofilepicture',
  checkAuth,
  upload.single('image'),
  async (req, res) => {
    try {
      console.log('file', req.file);
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read-write',
        ContentType: 'image/jpeg',
      };
      s3.upload(params, async (error, data) => {
        if (error) {
          console.log(error.message);
          return res.status(400).json({ error: error.message });
        }
        console.log(data);
        // updating the profile picture
        await User.findByIdAndUpdate(req.body.id, {
          image: data.Location,
        });
        // update all the posts by this user to update their profile picture within the post
        await Post.updateMany(
          { username: req.body.username },
          { profilepicture: data.Location },
        );
        console.log(
          'Posts by this user have had their profile pictures updated',
        );
        // update all the comments by this user to update their profile picture within the comment
        await Comment.updateMany(
          { username: req.body.username },
          { profilepicture: data.Location },
        );
        console.log(
          'Comments by this user have had their profile pictures updated',
        );
        // finding newest user image information in database
        const { image } = await User.findById(req.body.id);
        console.log('Profile picture has been updated');
        return res.status(200).json({ profilepicture: image });
      });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json(err.message);
    }
    return true;
  },
);

module.exports = router;
