const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, itemsTotal, deliveryCharge, discount, totalAmount, couponApplied } = req.body;

  if (!items || items.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    itemsTotal,
    deliveryCharge,
    discount,
    totalAmount,
    couponApplied,
  });

  res.status(201).json({ success: true, data: order });
});

// @desc    Get logged-in user orders
// @route   GET /api/orders/my
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, data: orders });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  // Only allow owner or admin to view
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    res.status(403);
    throw new Error('Not authorized');
  }

  res.json({ success: true, data: order });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
const getAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const total = await Order.countDocuments();
  const orders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    data: orders,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  order.status = req.body.status || order.status;

  if (req.body.status === 'Delivered') {
    order.deliveredAt = Date.now();
  }

  const updated = await order.save();
  res.json({ success: true, data: updated });
});

// @desc    Get admin analytics
// @route   GET /api/orders/analytics
const getAnalytics = asyncHandler(async (req, res) => {
  const totalOrders = await Order.countDocuments();
  const totalSalesResult = await Order.aggregate([
    { $group: { _id: null, total: { $sum: '$totalAmount' } } },
  ]);
  const totalSales = totalSalesResult[0]?.total || 0;

  const recentOrders = await Order.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

  const statusCounts = await Order.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const monthlySales = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
        total: { $sum: '$totalAmount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: -1 } },
    { $limit: 12 },
  ]);

  res.json({
    success: true,
    data: { totalOrders, totalSales, recentOrders, statusCounts, monthlySales },
  });
});

module.exports = { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, getAnalytics };
