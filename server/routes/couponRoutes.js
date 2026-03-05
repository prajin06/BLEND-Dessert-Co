const express = require('express');
const router = express.Router();
const { validateCoupon, createCoupon, getCoupons, deleteCoupon } = require('../controllers/couponController');
const { protect, admin } = require('../middleware/auth');

router.post('/validate', protect, validateCoupon);
router.route('/').get(protect, admin, getCoupons).post(protect, admin, createCoupon);
router.delete('/:id', protect, admin, deleteCoupon);

module.exports = router;
