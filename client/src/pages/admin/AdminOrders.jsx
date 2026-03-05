import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import { ORDER_STATUS_COLORS, pageTransition } from '../../utils/constants';
import toast from 'react-hot-toast';

const STATUSES = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders?limit=50').then(({ data }) => { setOrders(data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await api.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
      toast.success(`Order updated to ${status}`);
    } catch { toast.error('Failed to update'); }
  };

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/admin" className="text-gray-400 hover:text-primary-400"><FiArrowLeft size={20} /></Link>
        <h1 className="text-3xl font-bold">Manage <span className="text-gradient">Orders</span></h1>
      </div>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-24" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 glass-card"><p className="text-gray-500">No orders yet.</p></div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div key={order._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                <div>
                  <p className="font-bold">#{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-sm text-gray-500">{order.user?.name} ({order.user?.email})</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-primary-500">₹{order.totalAmount}</p>
                  <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Items */}
              <div className="flex flex-wrap gap-2 mb-3">
                {order.items?.map((item, i) => (
                  <span key={i} className="bg-cream-100 dark:bg-gray-700 rounded-lg px-3 py-1 text-xs">
                    {item.name} x{item.quantity}
                  </span>
                ))}
              </div>

              {/* Shipping */}
              <p className="text-xs text-gray-500 mb-3">
                Ship to: {order.shippingAddress?.street}, {order.shippingAddress?.city} - {order.shippingAddress?.pincode}
              </p>

              {/* Status Control */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium mr-2">Status:</span>
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(order._id, s)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${order.status === s ? ORDER_STATUS_COLORS[s] + ' ring-2 ring-offset-1 ring-gray-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AdminOrders;
