const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  comment: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
  postId: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('Comments', commentSchema);
