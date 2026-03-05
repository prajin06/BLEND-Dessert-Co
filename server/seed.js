const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Coupon = require('./models/Coupon');

dotenv.config();

const products = [
  // === COLD DRINKS ===
  { name: 'Badam Milk', description: 'Rich and creamy badam milk made with premium almonds. Available hot or cold.', price: 49, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400'], rating: 4.3, isVeg: true, isFeatured: false, tags: ['badam', 'milk', 'almond', 'hot', 'cold'] },
  { name: 'Rose Milk', description: 'Refreshing rose-flavored milk with a beautiful pink hue.', price: 49, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400'], rating: 4.2, isVeg: true, tags: ['rose', 'milk', 'refreshing'] },
  { name: 'Lassi', description: 'Traditional thick and creamy yogurt-based lassi.', price: 49, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400'], rating: 4.4, isVeg: true, tags: ['lassi', 'yogurt', 'traditional'] },
  { name: 'Mango Lassi', description: 'Sweet and tangy mango lassi made with fresh mango pulp.', price: 69, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400'], rating: 4.6, isVeg: true, isFeatured: true, tags: ['mango', 'lassi', 'fruit'] },
  { name: 'Strawberry Lassi', description: 'Delightful strawberry-flavored lassi with fresh berry goodness.', price: 69, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400'], rating: 4.5, isVeg: true, tags: ['strawberry', 'lassi', 'berry'] },
  { name: 'Chocolate Lassi', description: 'Unique fusion of chocolate and traditional lassi.', price: 69, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'], rating: 4.3, isVeg: true, tags: ['chocolate', 'lassi', 'fusion'] },

  // === MOJITOS ===
  { name: 'Virgin Mojito', description: 'Classic non-alcoholic mojito with fresh mint and lime.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400'], rating: 4.5, isVeg: true, isFeatured: true, tags: ['mojito', 'mint', 'lime', 'refreshing'] },
  { name: 'Blue Currant Mojito', description: 'Vibrant blue currant mojito with a tangy twist.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400'], rating: 4.4, isVeg: true, tags: ['blue currant', 'mojito'] },
  { name: 'Mango Mojito', description: 'Tropical mango-infused mojito bursting with flavor.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400'], rating: 4.5, isVeg: true, tags: ['mango', 'mojito', 'tropical'] },
  { name: 'Lichi Mojito', description: 'Exotic lychee mojito with a sweet aromatic taste.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400'], rating: 4.3, isVeg: true, tags: ['lichi', 'lychee', 'mojito'] },
  { name: 'Green Apple Mojito', description: 'Crisp green apple mojito with a refreshing sour kick.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1556881286-fc6915169721?w=400'], rating: 4.4, isVeg: true, tags: ['green apple', 'mojito'] },
  { name: 'Cranberry Mojito', description: 'Tart and refreshing cranberry mojito.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400'], rating: 4.2, isVeg: true, tags: ['cranberry', 'mojito'] },
  { name: 'Strawberry Mojito', description: 'Sweet strawberry mojito loaded with fresh berry flavor.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'], rating: 4.6, isVeg: true, tags: ['strawberry', 'mojito'] },

  // === MILKSHAKES ===
  { name: 'Plain Vanilla Milkshake', description: 'Classic creamy vanilla milkshake topped with whipped cream.', price: 109, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.2, isVeg: true, tags: ['vanilla', 'milkshake', 'classic'] },
  { name: 'Oreo Milkshake', description: 'Rich Oreo cookie milkshake with cookie crumble topping.', price: 109, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'], rating: 4.7, isVeg: true, isFeatured: true, tags: ['oreo', 'milkshake', 'cookie'] },
  { name: 'Strawberry Milkshake', description: 'Fresh strawberry milkshake blended to perfection.', price: 119, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400'], rating: 4.5, isVeg: true, tags: ['strawberry', 'milkshake'] },
  { name: 'Chocolate Milkshake', description: 'Indulgent chocolate milkshake with rich cocoa flavor.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400'], rating: 4.8, isVeg: true, isFeatured: true, tags: ['chocolate', 'milkshake'] },
  { name: 'Mango Milkshake', description: 'Tropical mango milkshake with real mango pulp.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400'], rating: 4.6, isVeg: true, tags: ['mango', 'milkshake'] },
  { name: 'Tender Coconut Milkshake', description: 'Refreshing tender coconut milkshake with natural sweetness.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400'], rating: 4.4, isVeg: true, tags: ['coconut', 'milkshake'] },
  { name: 'Avocado Milkshake', description: 'Creamy and healthy avocado milkshake.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400'], rating: 4.3, isVeg: true, tags: ['avocado', 'milkshake', 'healthy'] },
  { name: 'Caramel Milkshake', description: 'Buttery caramel milkshake with caramel drizzle.', price: 139, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'], rating: 4.5, isVeg: true, tags: ['caramel', 'milkshake'] },
  { name: 'Butterscotch Milkshake', description: 'Sweet butterscotch milkshake with crunchy bits.', price: 139, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.4, isVeg: true, tags: ['butterscotch', 'milkshake'] },
  { name: 'Milo Milkshake', description: 'Classic Milo chocolate malt milkshake.', price: 149, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400'], rating: 4.3, isVeg: true, tags: ['milo', 'milkshake', 'malt'] },
  { name: 'Kit Kat Milkshake', description: 'Crunchy Kit Kat milkshake with wafer pieces.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'], rating: 4.6, isVeg: true, tags: ['kitkat', 'milkshake', 'wafer'] },

  // === MOMOS ===
  { name: 'Mushroom Momos', description: 'Delicious steamed or fried mushroom momos with spicy dipping sauce.', price: 119, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.3, isVeg: true, priceVariants: [{ label: 'Steam', price: 119 }, { label: 'Fried', price: 129 }], tags: ['momos', 'mushroom', 'steamed', 'fried'] },
  { name: 'Paneer Momos', description: 'Soft paneer-filled momos with aromatic spices.', price: 129, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.5, isVeg: true, priceVariants: [{ label: 'Steam', price: 129 }, { label: 'Fried', price: 139 }], tags: ['momos', 'paneer'] },
  { name: 'Chicken Momos', description: 'Juicy chicken-stuffed momos served with red chutney.', price: 139, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.6, isVeg: false, isFeatured: true, priceVariants: [{ label: 'Steam', price: 139 }, { label: 'Fried', price: 149 }], tags: ['momos', 'chicken'] },
  { name: 'Chicken Peri Peri Momos', description: 'Spicy peri peri flavored chicken momos.', price: 139, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.4, isVeg: false, priceVariants: [{ label: 'Steam', price: 139 }, { label: 'Fried', price: 149 }], tags: ['momos', 'chicken', 'peri peri', 'spicy'] },
  { name: 'Chicken Schezwan Momos', description: 'Fiery schezwan chicken momos with bold flavors.', price: 139, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.5, isVeg: false, priceVariants: [{ label: 'Steam', price: 139 }, { label: 'Fried', price: 149 }], tags: ['momos', 'chicken', 'schezwan'] },
  { name: 'Cheese Momos', description: 'Gooey cheese-filled momos with a crispy exterior.', price: 149, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.7, isVeg: true, priceVariants: [{ label: 'Steam', price: 149 }, { label: 'Fried', price: 159 }], tags: ['momos', 'cheese'] },

  // === WAFFLES ===
  { name: 'White Chocolate Waffle', description: 'Crispy waffle drizzled with premium white chocolate sauce.', price: 119, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.5, isVeg: true, priceVariants: [{ label: 'Normal', price: 119 }, { label: 'Red Velvet', price: 149 }], tags: ['waffle', 'white chocolate'] },
  { name: 'Dark Chocolate Waffle', description: 'Rich dark chocolate waffle for true chocolate lovers.', price: 119, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.7, isVeg: true, isFeatured: true, priceVariants: [{ label: 'Normal', price: 119 }, { label: 'Red Velvet', price: 149 }], tags: ['waffle', 'dark chocolate'] },
  { name: 'Milk Chocolate Waffle', description: 'Classic milk chocolate waffle with smooth, creamy topping.', price: 119, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.4, isVeg: true, priceVariants: [{ label: 'Normal', price: 119 }, { label: 'Red Velvet', price: 149 }], tags: ['waffle', 'milk chocolate'] },
  { name: 'Blend Special Waffle', description: 'Our signature BLEND special waffle with premium toppings and sauces.', price: 159, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.9, isVeg: true, isFeatured: true, priceVariants: [{ label: 'Normal', price: 159 }, { label: 'Red Velvet', price: 179 }], tags: ['waffle', 'special', 'signature', 'blend'] },

  // === PANCAKES ===
  { name: 'White Chocolate Pancake', description: 'Fluffy pancakes topped with white chocolate sauce.', price: 119, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.3, isVeg: true, tags: ['pancake', 'white chocolate'] },
  { name: 'Dark Chocolate Pancake', description: 'Decadent dark chocolate pancakes with cocoa drizzle.', price: 119, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.5, isVeg: true, tags: ['pancake', 'dark chocolate'] },
  { name: 'Milk Chocolate Pancake', description: 'Smooth milk chocolate pancakes loved by all ages.', price: 119, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.4, isVeg: true, tags: ['pancake', 'milk chocolate'] },
  { name: 'Blend Special Pancake', description: 'Our premium BLEND special pancake stack with exclusive toppings.', price: 159, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.8, isVeg: true, tags: ['pancake', 'special', 'signature'] },

  // === CAKE SLICES ===
  { name: 'Triple Chocolate Cake Slice', description: 'Heavenly triple chocolate cake slice with three layers of chocolate goodness.', price: 139, category: 'Cake Slices', images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'], rating: 4.8, isVeg: true, isFeatured: true, tags: ['cake', 'chocolate', 'triple', 'dessert'] },
  { name: 'Brownie with Triple Chocolate', description: 'Dense, fudgy brownie smothered in triple chocolate sauce.', price: 79, category: 'Cake Slices', images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'], rating: 4.7, isVeg: true, isFeatured: true, tags: ['brownie', 'chocolate', 'dessert'] },

  // === HOT DRINKS ===
  { name: 'Filter Coffee', description: 'Authentic South Indian filter coffee brewed to perfection.', price: 29, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'], rating: 4.6, isVeg: true, tags: ['coffee', 'filter', 'south indian'] },
  { name: 'Tea', description: 'Classic Indian masala tea with aromatic spices.', price: 25, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'], rating: 4.3, isVeg: true, tags: ['tea', 'masala', 'classic'] },
  { name: 'Lemon Tea', description: 'Light and refreshing lemon tea with a citrus kick.', price: 20, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'], rating: 4.1, isVeg: true, tags: ['tea', 'lemon', 'citrus'] },
  { name: 'Hot Chocolate', description: 'Rich and velvety hot chocolate made with premium cocoa.', price: 99, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400'], rating: 4.7, isVeg: true, tags: ['hot chocolate', 'cocoa', 'premium'] },
  { name: 'Horlicks', description: 'Warm and comforting Horlicks malt drink.', price: 35, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400'], rating: 4.0, isVeg: true, tags: ['horlicks', 'malt'] },
  { name: 'Boost', description: 'Energizing Boost chocolate drink served hot.', price: 35, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400'], rating: 4.1, isVeg: true, tags: ['boost', 'chocolate', 'energy'] },

  // === BURGERS ===
  { name: 'Crispy Veg Burger', description: 'Crunchy vegetable patty burger with fresh lettuce and special sauce.', price: 109, category: 'Burgers', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.3, isVeg: true, tags: ['burger', 'veg', 'crispy'] },
  { name: 'Crispy Chicken Burger', description: 'Juicy crispy chicken burger with premium chicken fillet.', price: 129, category: 'Burgers', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.6, isVeg: false, tags: ['burger', 'chicken', 'crispy'] },

  // === PIZZA ===
  { name: 'Veg Pizza', description: 'Classic vegetable pizza with fresh toppings and mozzarella.', price: 159, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.3, isVeg: true, tags: ['pizza', 'veg'] },
  { name: 'Corn Pizza', description: 'Sweet corn pizza with cheese and herbs.', price: 169, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.2, isVeg: true, tags: ['pizza', 'corn'] },
  { name: 'Cheese Pizza', description: 'Extra cheesy pizza loaded with mozzarella and cheddar.', price: 199, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.6, isVeg: true, tags: ['pizza', 'cheese'] },
  { name: 'Paneer Pizza', description: 'Indian-style paneer pizza with spiced paneer cubes.', price: 179, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.5, isVeg: true, tags: ['pizza', 'paneer'] },
  { name: 'Mushroom Pizza', description: 'Earthy mushroom pizza with garlic and herbs.', price: 179, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.4, isVeg: true, tags: ['pizza', 'mushroom'] },
  { name: 'Chicken Pizza', description: 'Loaded chicken pizza with seasoned chicken chunks.', price: 199, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.7, isVeg: false, tags: ['pizza', 'chicken'] },

  // === NUGGETS & CUTLETS ===
  { name: 'Veg Nugget (10 Pcs)', description: 'Crispy golden veg nuggets served with dipping sauce.', price: 109, category: 'Nuggets & Cutlets', images: ['https://images.unsplash.com/photo-1562967914-608f82629710?w=400'], rating: 4.2, isVeg: true, tags: ['nuggets', 'veg', 'snack'] },
  { name: 'Veg Cutlet (2 Pcs)', description: 'Homestyle vegetable cutlets with crispy breadcrumb coating.', price: 69, category: 'Nuggets & Cutlets', images: ['https://images.unsplash.com/photo-1562967914-608f82629710?w=400'], rating: 4.1, isVeg: true, tags: ['cutlet', 'veg', 'snack'] },

  // === MAGGI ===
  { name: 'Veg Maggi', description: 'Classic veg Maggi noodles cooked with fresh vegetables.', price: 79, category: 'Maggi', images: ['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], rating: 4.2, isVeg: true, tags: ['maggi', 'noodles', 'veg'] },
  { name: 'Egg Maggi', description: 'Maggi noodles tossed with scrambled eggs.', price: 89, category: 'Maggi', images: ['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], rating: 4.3, isVeg: false, tags: ['maggi', 'noodles', 'egg'] },
  { name: 'Chicken Maggi', description: 'Loaded chicken Maggi with tender chicken pieces.', price: 99, category: 'Maggi', images: ['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], rating: 4.5, isVeg: false, tags: ['maggi', 'noodles', 'chicken'] },

  // === GRILL CHICKEN ===
  { name: 'Grill Chicken - Quarter', description: 'Perfectly grilled quarter chicken with BLEND special marinade.', price: 125, category: 'Grill Chicken', images: ['https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'], rating: 4.5, isVeg: false, tags: ['grill', 'chicken', 'quarter'] },
  { name: 'Grill Chicken - Half', description: 'Succulent half grilled chicken marinated with aromatic spices.', price: 249, category: 'Grill Chicken', images: ['https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'], rating: 4.7, isVeg: false, isFeatured: true, tags: ['grill', 'chicken', 'half'] },
  { name: 'Grill Chicken - Full', description: 'Whole grilled chicken — the ultimate feast for chicken lovers.', price: 399, category: 'Grill Chicken', images: ['https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'], rating: 4.8, isVeg: false, tags: ['grill', 'chicken', 'full'] },
];

const coupons = [
  { code: 'BLEND20', discountType: 'percentage', discountValue: 20, minOrderAmount: 200, maxDiscount: 100, usageLimit: 500, expiresAt: new Date('2027-12-31') },
  { code: 'FIRST50', discountType: 'fixed', discountValue: 50, minOrderAmount: 150, usageLimit: 1000, expiresAt: new Date('2027-12-31') },
  { code: 'SWEET10', discountType: 'percentage', discountValue: 10, minOrderAmount: 100, maxDiscount: 50, usageLimit: 200, expiresAt: new Date('2027-06-30') },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Product.deleteMany();
    await Coupon.deleteMany();
    console.log('Cleared existing products and coupons');

    // Seed products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    // Seed coupons
    await Coupon.insertMany(coupons);
    console.log(`Seeded ${coupons.length} coupons`);

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@blend.com' });
    if (!adminExists) {
      await User.create({
        name: 'BLEND Admin',
        email: 'admin@blend.com',
        password: 'admin123',
        role: 'admin',
        phone: '9677771981',
      });
      console.log('Admin user created (admin@blend.com / admin123)');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
