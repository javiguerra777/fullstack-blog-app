const express = require('express');
const Category = require('../../schema/category');
const checkAuth = require('../../middleware/middleware');

const router = express.Router();
// categories routes
router.post('/categories', checkAuth, async (req, res) => {
  try {
    const data = new Category({
      category: req.body.category,
      username: req.body.username.toLowerCase(),
      date: req.body.date,
    });
    const category = await data.save();
    console.log('New category created');
    res.status(200).json(category);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.put('/categories/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const options = { new: true };
    const result = await Category.findByIdAndUpdate(
      id,
      updateData,
      options,
    );
    console.log('Updating category, here is the result', result);
    res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

router.delete('/categories/:id', checkAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Category.findByIdAndDelete(id);
    console.log('Deleting category...', data);
    res.send('Deleted Category:', data);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
