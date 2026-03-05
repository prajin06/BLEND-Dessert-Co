import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, variant = null) => {
    setCartItems((prev) => {
      const key = variant ? `${product._id}-${variant.label}` : product._id;
      const existing = prev.find((item) => item.key === key);

      if (existing) {
        toast.success('Quantity updated');
        return prev.map((item) => (item.key === key ? { ...item, quantity: item.quantity + 1 } : item));
      }

      toast.success('Added to cart');
      return [
        ...prev,
        {
          key,
          _id: product._id,
          name: product.name,
          image: product.images?.[0] || '',
          price: variant ? variant.price : product.price,
          variant: variant?.label || null,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (key) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
    toast.success('Removed from cart');
  };

  const updateQuantity = (key, quantity) => {
    if (quantity < 1) return removeFromCart(key);
    setCartItems((prev) => prev.map((item) => (item.key === key ? { ...item, quantity } : item)));
  };

  const clearCart = () => {
    setCartItems([]);
    setCoupon(null);
    localStorage.removeItem('cart');
  };

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryCharge = itemsTotal > 300 ? 0 : 30;
  const discount = coupon ? coupon.discount : 0;
  const totalAmount = itemsTotal + deliveryCharge - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
        itemsTotal, totalItems, deliveryCharge, discount, totalAmount,
        coupon, setCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
