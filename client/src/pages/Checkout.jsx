import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMapPin, FiCreditCard, FiCheck } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import { pageTransition } from '../utils/constants';

const Checkout = () => {
  const { cartItems, itemsTotal, deliveryCharge, discount, totalAmount, coupon, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [address, setAddress] = useState({ street: '', city: 'Thanjavur', state: 'Tamil Nadu', pincode: '', phone: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.street || !address.pincode || !address.phone) {
      return toast.error('Please fill all address fields');
    }
    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id, name: item.name, image: item.image,
          price: item.price, variant: item.variant, quantity: item.quantity,
        })),
        shippingAddress: address,
        paymentMethod,
        itemsTotal,
        deliveryCharge,
        discount,
        totalAmount,
        couponApplied: coupon?.code || null,
      };
      await api.post('/orders', orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/profile');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <motion.div {...pageTransition} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* Shipping Address */}
        <div className="glass-card p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2"><FiMapPin /> Delivery Address</h2>
          <input type="text" placeholder="Street Address *" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="input-field" required />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input-field" />
            <input type="text" placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Pincode *" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className="input-field" required />
            <input type="tel" placeholder="Phone *" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="input-field" required />
          </div>
        </div>

        {/* Payment & Summary */}
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2"><FiCreditCard /> Payment Method</h2>
            {['COD', 'Razorpay', 'UPI'].map((method) => (
              <label key={method} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${paymentMethod === method ? 'bg-primary-50 dark:bg-primary-900/20 border-2 border-primary-400' : 'glass'}`}>
                <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="accent-primary-400" />
                <span className="font-medium">{method === 'COD' ? 'Cash on Delivery' : method === 'Razorpay' ? 'Razorpay (Card/Net Banking)' : 'UPI Payment'}</span>
              </label>
            ))}
          </div>

          <div className="glass-card p-6 space-y-3">
            <h3 className="font-bold">Order Summary</h3>
            <div className="text-sm space-y-1.5">
              {cartItems.map((item) => (
                <div key={item.key} className="flex justify-between">
                  <span className="truncate mr-2">{item.name} {item.variant ? `(${item.variant})` : ''} x{item.quantity}</span>
                  <span className="font-medium">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{itemsTotal}</span></div>
              <div className="flex justify-between"><span>Delivery</span><span>{deliveryCharge === 0 ? 'Free' : `₹${deliveryCharge}`}</span></div>
              {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{discount}</span></div>}
              <div className="flex justify-between text-lg font-bold border-t pt-2"><span>Total</span><span className="text-primary-500">₹{totalAmount}</span></div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg"
          >
            {loading ? 'Placing Order...' : <><FiCheck /> Place Order — ₹{totalAmount}</>}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default Checkout;
