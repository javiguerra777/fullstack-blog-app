const express = require('express');
const users = require('./private/users');
const posts = require('./private/posts');
const images = require('./private/images');
const categories = require('./private/categories');

const router = express.Router();

router.use(users);
router.use(posts);
router.use(images);
router.use(categories);

module.exports = router;
