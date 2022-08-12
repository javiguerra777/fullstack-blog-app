const express = require('express');
const checkAuth = require('../../middleware/middleware');
const Post = require('../../schema/post');

const router = express.Router();

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

module.exports = router;
