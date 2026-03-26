const express = require('express');
const router = express.Router();

// Mock products data
const mockProducts = [
  {
    _id: '1',
    name: 'Veg Nugget (10 Pcs)',
    description: 'Crispy golden veg nuggets served with dipping sauce.',
    price: 109,
    category: 'Nuggets & Cutlets',
    images: ['nugget.jpg'],
    rating: 4.5,
    numReviews: 12,
    stock: 50,
    isVeg: true,
    isFeatured: true,
    tags: ['popular', 'snack']
  },
  {
    _id: '2',
    name: 'Chocolate Milkshake',
    description: 'Rich and creamy chocolate milkshake with ice cream.',
    price: 149,
    category: 'Milkshakes',
    images: ['milkshake.jpg'],
    rating: 4.8,
    numReviews: 25,
    stock: 30,
    isVeg: true,
    isFeatured: true,
    tags: ['popular', 'sweet']
  },
  {
    _id: '3',
    name: 'Classic Waffle',
    description: 'Golden crispy waffle with maple syrup and butter.',
    price: 129,
    category: 'Waffles',
    images: ['waffle.jpg'],
    rating: 4.6,
    numReviews: 18,
    stock: 25,
    isVeg: true,
    isFeatured: false,
    tags: ['breakfast', 'sweet']
  },
  {
    _id: '4',
    name: 'Cold Coffee',
    description: 'Refreshing cold coffee with ice cream.',
    price: 99,
    category: 'Cold Drinks',
    images: ['coffee.jpg'],
    rating: 4.4,
    numReviews: 20,
    stock: 40,
    isVeg: true,
    isFeatured: true,
    tags: ['popular', 'drink']
  },
  {
    _id: '5',
    name: 'Veg Momos (6 Pcs)',
    description: 'Steamed veg momos with spicy dipping sauce.',
    price: 89,
    category: 'Momos',
    images: ['momos.jpg'],
    rating: 4.3,
    numReviews: 15,
    stock: 35,
    isVeg: true,
    isFeatured: false,
    tags: ['snack', 'popular']
  }
];

// Get all products
router.get('/', (req, res) => {
  const { page = 1, limit = 12, category } = req.query;
  
  let filteredProducts = mockProducts;
  
  if (category) {
    filteredProducts = mockProducts.filter(product => product.category === category);
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    success: true,
    data: paginatedProducts,
    page: parseInt(page),
    pages: Math.ceil(filteredProducts.length / limit),
    total: filteredProducts.length
  });
});

// Get featured products
router.get('/featured', (req, res) => {
  const featuredProducts = mockProducts.filter(product => product.isFeatured);
  res.json({
    success: true,
    data: featuredProducts
  });
});

// Get product by ID
router.get('/:id', (req, res) => {
  const product = mockProducts.find(p => p._id === req.params.id);
  
  if (product) {
    res.json({
      success: true,
      data: product
    });
  } else {
    res.status(404);
    res.json({
      success: false,
      message: 'Product not found'
    });
  }
});

// Get categories
router.get('/categories/all', (req, res) => {
  const categories = [...new Set(mockProducts.map(product => product.category))];
  res.json({
    success: true,
    data: categories
  });
});

module.exports = router;
