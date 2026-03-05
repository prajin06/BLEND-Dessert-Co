import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiDollarSign, FiPackage, FiUsers, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import api from '../../services/api';
import { ORDER_STATUS_COLORS, pageTransition } from '../../utils/constants';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/orders/analytics'),
      api.get('/users'),
    ]).then(([analyticsRes, usersRes]) => {
      setAnalytics(analyticsRes.data.data);
      setUsers(usersRes.data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const statCards = analytics ? [
    { label: 'Total Sales', value: `₹${analytics.totalSales.toLocaleString()}`, icon: FiDollarSign, color: 'from-green-400 to-green-600' },
    { label: 'Total Orders', value: analytics.totalOrders, icon: FiPackage, color: 'from-blue-400 to-blue-600' },
    { label: 'Total Users', value: users.length, icon: FiUsers, color: 'from-purple-400 to-purple-600' },
    { label: 'Products', value: '-', icon: FiShoppingBag, color: 'from-primary-400 to-primary-600' },
  ] : [];

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin <span className="text-gradient">Dashboard</span></h1>
        <div className="flex gap-3">
          <Link to="/admin/products" className="btn-primary text-sm flex items-center gap-1">Products <FiArrowRight /></Link>
          <Link to="/admin/orders" className="btn-secondary text-sm flex items-center gap-1">Orders <FiArrowRight /></Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32" />)}
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {statCards.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className="glass-card p-5 flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Status Breakdown */}
          {analytics?.statusCounts && (
            <div className="glass-card p-6 mb-8">
              <h3 className="font-bold mb-4">Order Status Breakdown</h3>
              <div className="flex flex-wrap gap-3">
                {analytics.statusCounts.map((s) => (
                  <span key={s._id} className={`px-4 py-2 rounded-xl text-sm font-medium ${ORDER_STATUS_COLORS[s._id] || 'bg-gray-100'}`}>
                    {s._id}: {s.count}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders */}
          {analytics?.recentOrders && (
            <div className="glass-card p-6 mb-8">
              <h3 className="font-bold mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {analytics.recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-3 bg-cream-50 dark:bg-gray-700/50 rounded-xl">
                    <div>
                      <p className="font-medium text-sm">#{order._id.slice(-8).toUpperCase()}</p>
                      <p className="text-xs text-gray-500">{order.user?.name || 'User'} — {new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${ORDER_STATUS_COLORS[order.status]}`}>{order.status}</span>
                      <span className="font-bold">₹{order.totalAmount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Monthly Sales */}
          {analytics?.monthlySales?.length > 0 && (
            <div className="glass-card p-6">
              <h3 className="font-bold mb-4">Monthly Sales</h3>
              <div className="space-y-2">
                {analytics.monthlySales.map((m) => (
                  <div key={m._id} className="flex items-center justify-between p-3 bg-cream-50 dark:bg-gray-700/50 rounded-xl">
                    <span className="font-medium">{m._id}</span>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{m.count} orders</span>
                      <span className="font-bold text-primary-500">₹{m.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
