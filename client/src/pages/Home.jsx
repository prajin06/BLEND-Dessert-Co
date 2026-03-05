import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar } from 'react-icons/fi';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, CATEGORY_EMOJIS, pageTransition } from '../utils/constants';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/featured').then(({ data }) => {
      setFeatured(data.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <motion.div {...pageTransition}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-cream-200 to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-500 rounded-full text-sm font-medium mb-4">
                Premium Desserts & More
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="text-gradient">BLEND</span>
                <br />
                Dessert & Co
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Indulge in our handcrafted waffles, milkshakes, cakes, and more. Every bite is a blend of perfection.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu" className="btn-primary flex items-center gap-2 text-lg">
                  Explore Menu <FiArrowRight />
                </Link>
                <Link to="/menu?category=Waffles" className="btn-secondary flex items-center gap-2">
                  Try Our Waffles
                </Link>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1"><FiStar className="text-yellow-400 fill-yellow-400" /> 4.8 Rating</div>
                <div>50+ Items</div>
                <div>Free Delivery over ₹300</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative w-80 h-80 mx-auto">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 opacity-20 blur-3xl"
                />
                <motion.img
                  animate={{ y: [0, -15, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  src="https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=400"
                  alt="Desserts"
                  className="relative w-full h-full object-cover rounded-3xl shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
        {/* Decorative */}
        <div className="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-cream-200 dark:from-gray-900 to-transparent" />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Browse <span className="text-gradient">Categories</span>
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/menu?category=${encodeURIComponent(cat)}`}
                className="glass-card p-4 text-center hover:border-primary-300 dark:hover:border-primary-600 transition-all block"
              >
                <span className="text-3xl mb-2 block">{CATEGORY_EMOJIS[cat] || '🍽️'}</span>
                <span className="text-sm font-medium">{cat}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold"
          >
            Featured <span className="text-gradient">Items</span>
          </motion.h2>
          <Link to="/menu" className="text-primary-400 hover:text-primary-500 font-medium flex items-center gap-1">
            View All <FiArrowRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass-card overflow-hidden">
                <div className="skeleton aspect-square rounded-none" />
                <div className="p-4 space-y-3">
                  <div className="skeleton h-5 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-400 to-chocolate-500 rounded-3xl p-8 md:p-14 text-white text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use Code BLEND20 for 20% Off!</h2>
          <p className="text-lg opacity-90 mb-6">On orders above ₹200. Valid for a limited time.</p>
          <Link to="/menu" className="inline-block bg-white text-chocolate-600 font-semibold py-3 px-8 rounded-xl hover:bg-cream-100 transition-all shadow-lg">
            Order Now
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Home;
