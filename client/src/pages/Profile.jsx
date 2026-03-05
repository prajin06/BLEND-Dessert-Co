import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiPackage, FiEdit2 } from 'react-icons/fi';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ORDER_STATUS_COLORS, pageTransition } from '../utils/constants';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', phone: '' });

  useEffect(() => {
    api.get('/orders/my').then(({ data }) => { setOrders(data.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put('/users/profile', form);
      updateUser(data.data);
      toast.success('Profile updated');
      setEditing(false);
    } catch (err) { toast.error('Failed to update'); }
  };

  return (
    <motion.div {...pageTransition} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Card */}
      <div className="glass-card p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2"><FiUser /> Profile</h2>
          <button onClick={() => setEditing(!editing)} className="text-primary-400 hover:text-primary-500"><FiEdit2 /></button>
        </div>
        {editing ? (
          <form onSubmit={handleUpdate} className="space-y-3">
            <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" />
            <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" />
            <div className="flex gap-2">
              <button type="submit" className="btn-primary text-sm">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="btn-secondary text-sm">Cancel</button>
            </div>
          </form>
        ) : (
          <div className="space-y-1 text-sm">
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> <span className="capitalize">{user?.role}</span></p>
          </div>
        )}
      </div>

      {/* Orders */}
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6"><FiPackage /> My Orders</h2>
      {loading ? (
        <div className="space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="skeleton h-24" />)}</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 glass-card">
          <p className="text-gray-500">No orders yet. Start ordering!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div key={order._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div>
                  <p className="font-semibold">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>{order.status}</span>
                  <span className="font-bold text-primary-500">₹{order.totalAmount}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 bg-cream-100 dark:bg-gray-700 rounded-lg px-3 py-1.5 text-sm">
                    {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded-md object-cover" />}
                    <span>{item.name} x{item.quantity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
