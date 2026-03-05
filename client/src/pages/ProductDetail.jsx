import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiStar, FiArrowLeft } from 'react-icons/fi';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { pageTransition } from '../utils/constants';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    api.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.data);
      if (data.data.priceVariants?.length) setSelectedVariant(data.data.priceVariants[0]);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  const handleWishlist = async () => {
    if (!user) return toast.error('Please login first');
    try {
      await api.put(`/users/wishlist/${id}`);
      toast.success('Wishlist updated');
    } catch { toast.error('Failed to update wishlist'); }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="skeleton aspect-square" />
        <div className="space-y-4">
          <div className="skeleton h-8 w-3/4" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
          <div className="skeleton h-12 w-32" />
        </div>
      </div>
    </div>
  );

  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/menu" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-400 mb-6 transition-colors">
        <FiArrowLeft /> Back to Menu
      </Link>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="glass-card overflow-hidden">
          <img src={product.images?.[0] || 'https://via.placeholder.com/600'} alt={product.name} className="w-full aspect-square object-cover" />
        </motion.div>

        {/* Details */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.isVeg ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Veg</span>
              ) : (
                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Non-Veg</span>
              )}
              <span className="px-3 py-1 bg-primary-100 text-primary-600 text-xs rounded-full font-medium">{product.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar key={i} className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.numReviews} reviews)</span>
          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>

          {/* Price / Variants */}
          {product.priceVariants?.length > 0 ? (
            <div>
              <p className="font-medium mb-3">Select Variant:</p>
              <div className="flex flex-wrap gap-3">
                {product.priceVariants.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariant(v)}
                    className={`px-5 py-2.5 rounded-xl font-medium transition-all ${selectedVariant?.label === v.label ? 'bg-primary-400 text-white shadow-md' : 'glass hover:bg-primary-50 dark:hover:bg-gray-700'}`}
                  >
                    {v.label} — ₹{v.price}
                  </button>
                ))}
              </div>
              <p className="text-3xl font-bold text-primary-500 mt-4">₹{selectedVariant?.price || product.price}</p>
            </div>
          ) : (
            <p className="text-3xl font-bold text-primary-500">₹{product.price}</p>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(product, selectedVariant)}
              className="btn-primary flex items-center gap-2 text-lg"
            >
              <FiShoppingCart /> Add to Cart
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlist}
              className="btn-secondary flex items-center gap-2"
            >
              <FiHeart /> Wishlist
            </motion.button>
          </div>

          {/* Info */}
          <div className="glass-card p-4 space-y-2 text-sm">
            <p>Stock: <span className={product.stock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>
            <p>Free delivery on orders above ₹300</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
