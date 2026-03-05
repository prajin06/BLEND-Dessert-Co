export const CATEGORIES = [
  'Cold Drinks', 'Mojitos', 'Milkshakes', 'Momos', 'Waffles',
  'Pancakes', 'Cake Slices', 'Hot Drinks', 'Burgers', 'Pizza',
  'Nuggets & Cutlets', 'Maggi', 'Grill Chicken',
];

export const CATEGORY_EMOJIS = {
  'Cold Drinks': '🥤', 'Mojitos': '🍹', 'Milkshakes': '🥛', 'Momos': '🥟',
  'Waffles': '🧇', 'Pancakes': '🥞', 'Cake Slices': '🍰', 'Hot Drinks': '☕',
  'Burgers': '🍔', 'Pizza': '🍕', 'Nuggets & Cutlets': '🍗', 'Maggi': '🍜',
  'Grill Chicken': '🍗', 'Ice Cream': '🍦', 'Custom Dessert Box': '🎁',
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export const ORDER_STATUS_COLORS = {
  Pending: 'bg-yellow-100 text-yellow-700',
  Confirmed: 'bg-blue-100 text-blue-700',
  Preparing: 'bg-orange-100 text-orange-700',
  'Out for Delivery': 'bg-purple-100 text-purple-700',
  Delivered: 'bg-green-100 text-green-700',
  Cancelled: 'bg-red-100 text-red-700',
};
