const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category: {
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

module.exports = mongoose.model('Categories', categorySchema);
