// Fallback data used when the backend API is unavailable
let idCounter = 1;
const id = () => `mock_${String(idCounter++).padStart(3, '0')}`;

export const mockProducts = [
  // COLD DRINKS
  { _id: id(), name: 'Badam Milk', description: 'Rich and creamy badam milk made with premium almonds. Available hot or cold.', price: 49, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400'], rating: 4.3, numReviews: 12, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: ['badam', 'milk'] },
  { _id: id(), name: 'Rose Milk', description: 'Refreshing rose-flavored milk with a beautiful pink hue.', price: 49, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400'], rating: 4.2, numReviews: 8, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Lassi', description: 'Traditional thick and creamy yogurt-based lassi.', price: 49, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=400'], rating: 4.4, numReviews: 15, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Mango Lassi', description: 'Sweet and tangy mango lassi made with fresh mango pulp.', price: 69, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=400'], rating: 4.6, numReviews: 22, isVeg: true, isFeatured: true, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Strawberry Lassi', description: 'Delightful strawberry-flavored lassi with fresh berry goodness.', price: 69, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400'], rating: 4.5, numReviews: 10, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Chocolate Lassi', description: 'Unique fusion of chocolate and traditional lassi.', price: 69, category: 'Cold Drinks', images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'], rating: 4.3, numReviews: 7, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // MOJITOS
  { _id: id(), name: 'Virgin Mojito', description: 'Classic non-alcoholic mojito with fresh mint and lime.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400'], rating: 4.5, numReviews: 30, isVeg: true, isFeatured: true, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Blue Currant Mojito', description: 'Vibrant blue currant mojito with a tangy twist.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=400'], rating: 4.4, numReviews: 14, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Mango Mojito', description: 'Tropical mango-infused mojito bursting with flavor.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400'], rating: 4.5, numReviews: 18, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Lichi Mojito', description: 'Exotic lychee mojito with a sweet aromatic taste.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400'], rating: 4.3, numReviews: 9, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Green Apple Mojito', description: 'Crisp green apple mojito with a refreshing sour kick.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1556881286-fc6915169721?w=400'], rating: 4.4, numReviews: 11, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Cranberry Mojito', description: 'Tart and refreshing cranberry mojito.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400'], rating: 4.2, numReviews: 6, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Strawberry Mojito', description: 'Sweet strawberry mojito loaded with fresh berry flavor.', price: 99, category: 'Mojitos', images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'], rating: 4.6, numReviews: 20, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // MILKSHAKES
  { _id: id(), name: 'Plain Vanilla Milkshake', description: 'Classic creamy vanilla milkshake topped with whipped cream.', price: 109, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.2, numReviews: 10, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Oreo Milkshake', description: 'Rich Oreo cookie milkshake with cookie crumble topping.', price: 109, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'], rating: 4.7, numReviews: 35, isVeg: true, isFeatured: true, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Strawberry Milkshake', description: 'Fresh strawberry milkshake blended to perfection.', price: 119, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400'], rating: 4.5, numReviews: 16, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Chocolate Milkshake', description: 'Indulgent chocolate milkshake with rich cocoa flavor.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400'], rating: 4.8, numReviews: 42, isVeg: true, isFeatured: true, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Mango Milkshake', description: 'Tropical mango milkshake with real mango pulp.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400'], rating: 4.6, numReviews: 19, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Tender Coconut Milkshake', description: 'Refreshing tender coconut milkshake with natural sweetness.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=400'], rating: 4.4, numReviews: 11, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Avocado Milkshake', description: 'Creamy and healthy avocado milkshake.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1638176066666-ffb2f013c7dd?w=400'], rating: 4.3, numReviews: 8, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Caramel Milkshake', description: 'Buttery caramel milkshake with caramel drizzle.', price: 139, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400'], rating: 4.5, numReviews: 13, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Butterscotch Milkshake', description: 'Sweet butterscotch milkshake with crunchy bits.', price: 139, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.4, numReviews: 10, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Milo Milkshake', description: 'Classic Milo chocolate malt milkshake.', price: 149, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1541658016709-82535e94bc69?w=400'], rating: 4.3, numReviews: 7, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Kit Kat Milkshake', description: 'Crunchy Kit Kat milkshake with wafer pieces.', price: 129, category: 'Milkshakes', images: ['https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400'], rating: 4.6, numReviews: 17, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // MOMOS
  { _id: id(), name: 'Mushroom Momos', description: 'Delicious steamed or fried mushroom momos with spicy dipping sauce.', price: 119, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.3, numReviews: 14, isVeg: true, isFeatured: false, stock: 50, priceVariants: [{ label: 'Steam', price: 119 }, { label: 'Fried', price: 129 }], tags: [] },
  { _id: id(), name: 'Paneer Momos', description: 'Soft paneer-filled momos with aromatic spices.', price: 129, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.5, numReviews: 18, isVeg: true, isFeatured: false, stock: 50, priceVariants: [{ label: 'Steam', price: 129 }, { label: 'Fried', price: 139 }], tags: [] },
  { _id: id(), name: 'Chicken Momos', description: 'Juicy chicken-stuffed momos served with red chutney.', price: 139, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.6, numReviews: 28, isVeg: false, isFeatured: true, stock: 50, priceVariants: [{ label: 'Steam', price: 139 }, { label: 'Fried', price: 149 }], tags: [] },
  { _id: id(), name: 'Chicken Peri Peri Momos', description: 'Spicy peri peri flavored chicken momos.', price: 139, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.4, numReviews: 12, isVeg: false, isFeatured: false, stock: 50, priceVariants: [{ label: 'Steam', price: 139 }, { label: 'Fried', price: 149 }], tags: [] },
  { _id: id(), name: 'Cheese Momos', description: 'Gooey cheese-filled momos with a crispy exterior.', price: 149, category: 'Momos', images: ['https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=400'], rating: 4.7, numReviews: 24, isVeg: true, isFeatured: false, stock: 50, priceVariants: [{ label: 'Steam', price: 149 }, { label: 'Fried', price: 159 }], tags: [] },

  // WAFFLES
  { _id: id(), name: 'White Chocolate Waffle', description: 'Crispy waffle drizzled with premium white chocolate sauce.', price: 119, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.5, numReviews: 20, isVeg: true, isFeatured: false, stock: 50, priceVariants: [{ label: 'Normal', price: 119 }, { label: 'Red Velvet', price: 149 }], tags: [] },
  { _id: id(), name: 'Dark Chocolate Waffle', description: 'Rich dark chocolate waffle for true chocolate lovers.', price: 119, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.7, numReviews: 32, isVeg: true, isFeatured: true, stock: 50, priceVariants: [{ label: 'Normal', price: 119 }, { label: 'Red Velvet', price: 149 }], tags: [] },
  { _id: id(), name: 'Milk Chocolate Waffle', description: 'Classic milk chocolate waffle with smooth, creamy topping.', price: 119, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.4, numReviews: 15, isVeg: true, isFeatured: false, stock: 50, priceVariants: [{ label: 'Normal', price: 119 }, { label: 'Red Velvet', price: 149 }], tags: [] },
  { _id: id(), name: 'Blend Special Waffle', description: 'Our signature BLEND special waffle with premium toppings and sauces.', price: 159, category: 'Waffles', images: ['https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400'], rating: 4.9, numReviews: 40, isVeg: true, isFeatured: true, stock: 50, priceVariants: [{ label: 'Normal', price: 159 }, { label: 'Red Velvet', price: 179 }], tags: [] },

  // PANCAKES
  { _id: id(), name: 'White Chocolate Pancake', description: 'Fluffy pancakes topped with white chocolate sauce.', price: 119, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.3, numReviews: 11, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Dark Chocolate Pancake', description: 'Decadent dark chocolate pancakes with cocoa drizzle.', price: 119, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.5, numReviews: 16, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Blend Special Pancake', description: 'Our premium BLEND special pancake stack with exclusive toppings.', price: 159, category: 'Pancakes', images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400'], rating: 4.8, numReviews: 22, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // CAKE SLICES
  { _id: id(), name: 'Triple Chocolate Cake Slice', description: 'Heavenly triple chocolate cake slice with three layers of chocolate goodness.', price: 139, category: 'Cake Slices', images: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'], rating: 4.8, numReviews: 38, isVeg: true, isFeatured: true, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Brownie with Triple Chocolate', description: 'Dense, fudgy brownie smothered in triple chocolate sauce.', price: 79, category: 'Cake Slices', images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400'], rating: 4.7, numReviews: 30, isVeg: true, isFeatured: true, stock: 50, priceVariants: [], tags: [] },

  // HOT DRINKS
  { _id: id(), name: 'Filter Coffee', description: 'Authentic South Indian filter coffee brewed to perfection.', price: 29, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400'], rating: 4.6, numReviews: 45, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Tea', description: 'Classic Indian masala tea with aromatic spices.', price: 25, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'], rating: 4.3, numReviews: 30, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Lemon Tea', description: 'Light and refreshing lemon tea with a citrus kick.', price: 20, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400'], rating: 4.1, numReviews: 12, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Hot Chocolate', description: 'Rich and velvety hot chocolate made with premium cocoa.', price: 99, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400'], rating: 4.7, numReviews: 25, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Horlicks', description: 'Warm and comforting Horlicks malt drink.', price: 35, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400'], rating: 4.0, numReviews: 8, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Boost', description: 'Energizing Boost chocolate drink served hot.', price: 35, category: 'Hot Drinks', images: ['https://images.unsplash.com/photo-1517578239113-b03992dcdd25?w=400'], rating: 4.1, numReviews: 6, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // BURGERS
  { _id: id(), name: 'Crispy Veg Burger', description: 'Crunchy vegetable patty burger with fresh lettuce and special sauce.', price: 109, category: 'Burgers', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.3, numReviews: 20, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Crispy Chicken Burger', description: 'Juicy crispy chicken burger with premium chicken fillet.', price: 129, category: 'Burgers', images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400'], rating: 4.6, numReviews: 28, isVeg: false, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // PIZZA
  { _id: id(), name: 'Veg Pizza', description: 'Classic vegetable pizza with fresh toppings and mozzarella.', price: 159, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.3, numReviews: 18, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Corn Pizza', description: 'Sweet corn pizza with cheese and herbs.', price: 169, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.2, numReviews: 12, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Cheese Pizza', description: 'Extra cheesy pizza loaded with mozzarella and cheddar.', price: 199, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.6, numReviews: 32, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Paneer Pizza', description: 'Indian-style paneer pizza with spiced paneer cubes.', price: 179, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.5, numReviews: 15, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Mushroom Pizza', description: 'Earthy mushroom pizza with garlic and herbs.', price: 179, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.4, numReviews: 14, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Chicken Pizza', description: 'Loaded chicken pizza with seasoned chicken chunks.', price: 199, category: 'Pizza', images: ['https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400'], rating: 4.7, numReviews: 26, isVeg: false, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // NUGGETS & CUTLETS
  { _id: id(), name: 'Veg Nugget (10 Pcs)', description: 'Crispy golden veg nuggets served with dipping sauce.', price: 109, category: 'Nuggets & Cutlets', images: ['https://images.unsplash.com/photo-1562967914-608f82629710?w=400'], rating: 4.2, numReviews: 10, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Veg Cutlet (2 Pcs)', description: 'Homestyle vegetable cutlets with crispy breadcrumb coating.', price: 69, category: 'Nuggets & Cutlets', images: ['https://images.unsplash.com/photo-1562967914-608f82629710?w=400'], rating: 4.1, numReviews: 8, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // MAGGI
  { _id: id(), name: 'Veg Maggi', description: 'Classic veg Maggi noodles cooked with fresh vegetables.', price: 79, category: 'Maggi', images: ['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], rating: 4.2, numReviews: 15, isVeg: true, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Egg Maggi', description: 'Maggi noodles tossed with scrambled eggs.', price: 89, category: 'Maggi', images: ['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], rating: 4.3, numReviews: 12, isVeg: false, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Chicken Maggi', description: 'Loaded chicken Maggi with tender chicken pieces.', price: 99, category: 'Maggi', images: ['https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400'], rating: 4.5, numReviews: 18, isVeg: false, isFeatured: false, stock: 50, priceVariants: [], tags: [] },

  // GRILL CHICKEN
  { _id: id(), name: 'Grill Chicken - Quarter', description: 'Perfectly grilled quarter chicken with BLEND special marinade.', price: 125, category: 'Grill Chicken', images: ['https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'], rating: 4.5, numReviews: 22, isVeg: false, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Grill Chicken - Half', description: 'Succulent half grilled chicken marinated with aromatic spices.', price: 249, category: 'Grill Chicken', images: ['https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'], rating: 4.7, numReviews: 35, isVeg: false, isFeatured: true, stock: 50, priceVariants: [], tags: [] },
  { _id: id(), name: 'Grill Chicken - Full', description: 'Whole grilled chicken — the ultimate feast for chicken lovers.', price: 399, category: 'Grill Chicken', images: ['https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400'], rating: 4.8, numReviews: 28, isVeg: false, isFeatured: false, stock: 50, priceVariants: [], tags: [] },
];

// Helper functions to simulate API responses
export const getMockProducts = ({ category, search, sort, page = 1, limit = 12 }) => {
  let filtered = [...mockProducts];

  if (category) filtered = filtered.filter((p) => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  if (sort === 'price_asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price_desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  else if (sort === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  return { data: paginated, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};

export const getMockFeatured = () => mockProducts.filter((p) => p.isFeatured);

export const getMockProduct = (id) => mockProducts.find((p) => p._id === id) || null;
