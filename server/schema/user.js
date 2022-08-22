/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  password: {
    required: true,
    type: String,
    trim: true,
  },
  image: {
    required: false,
    type: String,
  },
  date: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model('User', userSchema);
