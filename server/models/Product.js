const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Product name is required'], trim: true },
    description: { type: String, required: [true, 'Product description is required'] },
    price: { type: Number, required: [true, 'Product price is required'], min: 0 },
    priceVariants: [
      {
        label: String,
        price: Number,
      },
    ],
    category: {
      type: String,
      required: [true, 'Product category is required'],
      enum: [
        'Cold Drinks',
        'Mojitos',
        'Milkshakes',
        'Momos',
        'Waffles',
        'Pancakes',
        'Cake Slices',
        'Hot Drinks',
        'Burgers',
        'Pizza',
        'Nuggets & Cutlets',
        'Maggi',
        'Grill Chicken',
        'Ice Cream',
        'Custom Dessert Box',
      ],
    },
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 50 },
    isVeg: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
