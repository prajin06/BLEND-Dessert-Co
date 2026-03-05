const express = require('express');
const router = express.Router();
const { getProducts, getFeaturedProducts, getProduct, createProduct, updateProduct, deleteProduct, getCategories } = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');

router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProduct).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);

module.exports = router;
