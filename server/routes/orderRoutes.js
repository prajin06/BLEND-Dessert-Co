const express = require('express');
const router = express.Router();
const { createOrder, getMyOrders, getOrderById, getAllOrders, updateOrderStatus, getAnalytics } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');

router.route('/').post(protect, createOrder).get(protect, admin, getAllOrders);
router.get('/my', protect, getMyOrders);
router.get('/analytics', protect, admin, getAnalytics);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;
