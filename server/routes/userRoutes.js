const express = require('express');
const router = express.Router();
const { updateProfile, toggleWishlist, getWishlist, getAllUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/auth');

router.put('/profile', protect, updateProfile);
router.get('/wishlist', protect, getWishlist);
router.put('/wishlist/:productId', protect, toggleWishlist);
router.route('/').get(protect, admin, getAllUsers);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
