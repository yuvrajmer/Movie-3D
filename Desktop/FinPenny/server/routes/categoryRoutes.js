const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/categoryController');

router.get('/blog/categories',       ctrl.getCategories);
router.post('/blog/categories',      ctrl.createCategory);
router.put('/blog/categories/:id',   ctrl.updateCategory);
router.delete('/blog/categories/:id', ctrl.deleteCategory);

module.exports = router;
