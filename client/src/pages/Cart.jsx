import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiMinus, FiPlus, FiShoppingBag, FiTag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { pageTransition } from '../utils/constants';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, itemsTotal, deliveryCharge, discount, totalAmount, coupon, setCoupon } = useCart();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [applying, setApplying] = useState(false);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplying(true);
    try {
      const { data } = await api.post('/coupons/validate', { code: couponCode, orderTotal: itemsTotal });
      setCoupon(data.data);
      toast.success(`Coupon applied! ₹${data.data.discount} off`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid coupon');
    }
    setApplying(false);
  };

  if (cartItems.length === 0) {
    return (
      <motion.div {...pageTransition} className="max-w-2xl mx-auto px-4 py-20 text-center">
        <FiShoppingBag className="mx-auto text-6xl text-gray-300 mb-6" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some delicious items from our menu!</p>
        <Link to="/menu" className="btn-primary">Browse Menu</Link>
      </motion.div>
    );
  }

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Your <span className="text-gradient">Cart</span></h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div
                key={item.key}
                layout
                exit={{ opacity: 0, x: -100 }}
                className="glass-card p-4 flex gap-4"
              >
                <img src={item.image || 'https://via.placeholder.com/100'} alt={item.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  {item.variant && <p className="text-xs text-gray-500">{item.variant}</p>}
                  <p className="text-primary-500 font-bold mt-1">₹{item.price}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(item.key)} className="text-red-400 hover:text-red-500 p-1"><FiTrash2 size={16} /></button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiMinus size={14} />
                    </button>
                    <span className="font-semibold w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700">
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <button onClick={clearCart} className="text-red-400 hover:text-red-500 text-sm font-medium">Clear Cart</button>
        </div>

        {/* Summary */}
        <div className="glass-card p-6 h-fit sticky top-24 space-y-4">
          <h3 className="text-xl font-bold">Order Summary</h3>

          {/* Coupon */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                className="input-field !pl-9 !py-2 text-sm"
              />
            </div>
            <button onClick={applyCoupon} disabled={applying} className="btn-primary !py-2 !px-4 text-sm">
              {applying ? '...' : 'Apply'}
            </button>
          </div>
          {coupon && (
            <div className="text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
              Coupon {coupon.code}: -₹{coupon.discount}
            </div>
          )}

          <div className="space-y-2 text-sm border-t pt-4">
            <div className="flex justify-between"><span>Items Total</span><span>₹{itemsTotal}</span></div>
            <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? <span className="text-green-600">Free</span> : `₹${deliveryCharge}`}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount}</span></div>}
            <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span className="text-primary-500">₹{totalAmount}</span></div>
          </div>

          {user ? (
            <Link to="/checkout" className="btn-primary w-full text-center block">Proceed to Checkout</Link>
          ) : (
            <Link to="/login" className="btn-primary w-full text-center block">Login to Checkout</Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Cart;
