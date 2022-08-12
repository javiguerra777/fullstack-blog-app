const express = require('express');
const Comment = require('../../schema/comment');

const router = express.Router();

// get comments from database based off post id
router.get('/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await Comment.find({
      postId: id,
    });
    // console.log(
    //   `Comments from post that has post id ${id}`,
    //   comments,
    // );
    res.status(200).json(comments);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
