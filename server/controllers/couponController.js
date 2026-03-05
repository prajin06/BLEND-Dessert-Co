const asyncHandler = require('express-async-handler');
const Coupon = require('../models/Coupon');

// @desc    Validate coupon
// @route   POST /api/coupons/validate
const validateCoupon = asyncHandler(async (req, res) => {
  const { code, orderTotal } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

  if (!coupon) {
    res.status(404);
    throw new Error('Invalid coupon code');
  }

  if (coupon.expiresAt < new Date()) {
    res.status(400);
    throw new Error('Coupon has expired');
  }

  if (coupon.usedCount >= coupon.usageLimit) {
    res.status(400);
    throw new Error('Coupon usage limit reached');
  }

  if (orderTotal < coupon.minOrderAmount) {
    res.status(400);
    throw new Error(`Minimum order amount is ₹${coupon.minOrderAmount}`);
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (orderTotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
  } else {
    discount = coupon.discountValue;
  }

  res.json({ success: true, data: { code: coupon.code, discount: Math.round(discount), discountType: coupon.discountType, discountValue: coupon.discountValue } });
});

// @desc    Create coupon (Admin)
// @route   POST /api/coupons
const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json({ success: true, data: coupon });
});

// @desc    Get all coupons (Admin)
// @route   GET /api/coupons
const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json({ success: true, data: coupons });
});

// @desc    Delete coupon (Admin)
// @route   DELETE /api/coupons/:id
const deleteCoupon = asyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: 'Coupon removed' });
});

module.exports = { validateCoupon, createCoupon, getCoupons, deleteCoupon };
