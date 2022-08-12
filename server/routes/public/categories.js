const express = require('express');
const Category = require('../../schema/category');

const router = express.Router();

// categories routes
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    console.log('Obtaining all categories');
    res.status(200).json(categories);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
