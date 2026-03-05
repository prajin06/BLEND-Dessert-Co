const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.avatar = req.body.avatar || user.avatar;
  if (req.body.address) user.address = req.body.address;
  if (req.body.password) user.password = req.body.password;

  const updated = await user.save();
  res.json({
    success: true,
    data: { _id: updated._id, name: updated.name, email: updated.email, role: updated.role, phone: updated.phone, address: updated.address, avatar: updated.avatar },
  });
});

// @desc    Toggle wishlist item
// @route   PUT /api/users/wishlist/:productId
const toggleWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;
  const index = user.wishlist.indexOf(productId);

  if (index > -1) {
    user.wishlist.splice(index, 1);
  } else {
    user.wishlist.push(productId);
  }

  await user.save();
  const populated = await User.findById(req.user._id).populate('wishlist');
  res.json({ success: true, data: populated.wishlist });
});

// @desc    Get wishlist
// @route   GET /api/users/wishlist
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json({ success: true, data: user.wishlist });
});

// @desc    Get all users (Admin)
// @route   GET /api/users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password').sort({ createdAt: -1 });
  res.json({ success: true, data: users });
});

// @desc    Delete user (Admin)
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ success: true, message: 'User removed' });
});

module.exports = { updateProfile, toggleWishlist, getWishlist, getAllUsers, deleteUser };
