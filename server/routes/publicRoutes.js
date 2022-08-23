/* eslint-disable no-underscore-dangle */
const express = require('express');
const register = require('./public/register');
const posts = require('./public/posts');
const users = require('./public/users');
const categories = require('./public/categories');
const comments = require('./public/comments');

const router = express.Router();

// public endpoints
router.use(register);
router.use(posts);
router.use(users);
router.use(categories);
router.use(comments);

module.exports = router;
