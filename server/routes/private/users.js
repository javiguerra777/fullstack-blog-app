const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const checkAuth = require('../../middleware/middleware');
const User = require('../../schema/user');
const Post = require('../../schema/post');
const Comment = require('../../schema/comment');

// salt rounds necessary to make bcrypt work, salt rounds are used for extra protection against hackers
const saltRounds = 10;
const router = express.Router();

// update user profile routes
router.put('/updateusername', checkAuth, async (req, res) => {
  try {
    console.log(req.body.newusername);
    // updates username in the database
    await User.findByIdAndUpdate(req.body.id, {
      username: req.body.newusername.toLowerCase(),
    });
    // find updated user based off the new username param
    const [user] = await User.find({
      username: req.body.newusername.toLowerCase(),
    });
    if (!user) {
      console.log('user does not exist');
      return res.status(404).json({ error: 'user not found' });
    }
    console.log('username updated successfully');
    // updates all the posts in the database where the user made a post as a previous name to the users new name
    await Post.updateMany(
      { username: req.body.username },
      { username: req.body.newusername },
    );
    console.log('All posts usernames have been updated');
    // updates all the comments in the database where the user made a comment as a previous name to the users new name
    await Comment.updateMany(
      { username: req.body.username },
      { username: req.body.newusername },
    );
    console.log('All comments usernames have been updated');
    const payload = {
      userId: user.id,
      username: user.username,
    };
    // send a new JWT to the user if the user is able to successfully change their username
    const updatedEncodedUser = jwt.sign(payload, process.env.JWT_KEY);
    return res.status(200).json({
      token: updatedEncodedUser,
      username: req.body.newusername,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json(err.message);
  }
});

router.put('/updatepassword', checkAuth, async (req, res) => {
  try {
    await bcrypt
      .hash(req.body.password, saltRounds)
      .then(async (hash) => {
        try {
          await User.findByIdAndUpdate(req.body.id, {
            password: hash,
          });
        } catch (err) {
          console.log(err.message);
        }
      });
    // send a new JWT if a user is able to successfully update their password
    const updatedEncodedUser = jwt.sign(
      {
        userId: req.body.userId,
        username: req.body.username,
      },
      process.env.JWT_KEY,
    );
    res.status(200).json({ token: updatedEncodedUser });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
