const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc    Get all products (with search, filter, pagination)
// @route   GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  const query = {};

  // Category filter
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Veg filter
  if (req.query.isVeg !== undefined) {
    query.isVeg = req.query.isVeg === 'true';
  }

  // Price range
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
  }

  // Search
  if (req.query.search) {
    query.$text = { $search: req.query.search };
  }

  // Sort
  let sort = { createdAt: -1 };
  if (req.query.sort === 'price_asc') sort = { price: 1 };
  if (req.query.sort === 'price_desc') sort = { price: -1 };
  if (req.query.sort === 'rating') sort = { rating: -1 };
  if (req.query.sort === 'name') sort = { name: 1 };

  const total = await Product.countDocuments(query);
  const products = await Product.find(query).sort(sort).skip(skip).limit(limit);

  res.json({
    success: true,
    data: products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
});

// @desc    Get featured products
// @route   GET /api/products/featured
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  res.json({ success: true, data: products });
});

// @desc    Get single product
// @route   GET /api/products/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @desc    Create product (Admin)
// @route   POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json({ success: true, data: product });
});

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, data: product });
});

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  res.json({ success: true, message: 'Product removed' });
});

// @desc    Get all categories
// @route   GET /api/products/categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Product.distinct('category');
  res.json({ success: true, data: categories });
});

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
