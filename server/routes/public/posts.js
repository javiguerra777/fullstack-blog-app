const express = require('express');
const Post = require('../../schema/post');

const router = express.Router();

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
    // console.log('Grabbing post by id, here is the result', result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.post('/filteredpost', async (req, res) => {
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

module.exports = router;
