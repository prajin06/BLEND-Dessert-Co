import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { pageTransition } from '../utils/constants';
import toast from 'react-hot-toast';

const Wishlist = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const { data } = await api.get('/users/wishlist');
      setItems(data.data);
    } catch { /* empty */ }
    setLoading(false);
  };

  useEffect(() => { fetchWishlist(); }, []);

  const toggleWishlist = async (productId) => {
    try {
      const { data } = await api.put(`/users/wishlist/${productId}`);
      setItems(data.data);
      toast.success('Wishlist updated');
    } catch { toast.error('Failed'); }
  };

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2"><FiHeart className="text-primary-400" /> Wishlist</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass-card overflow-hidden"><div className="skeleton aspect-square rounded-none" /><div className="p-4 space-y-3"><div className="skeleton h-5 w-3/4" /></div></div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <FiHeart className="mx-auto text-6xl text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-500 mb-6">Save your favorite items here!</p>
          <Link to="/menu" className="btn-primary">Browse Menu</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} onWishlistToggle={toggleWishlist} isWishlisted={true} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Wishlist;
