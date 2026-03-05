import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onWishlistToggle, isWishlisted }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group"
    >
      {/* Image */}
      <Link to={`/product/${product._id}`} className="block relative overflow-hidden">
        <div className="aspect-square bg-cream-100 dark:bg-gray-700">
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {product.isVeg ? (
            <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full font-medium">Veg</span>
          ) : (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-medium">Non-Veg</span>
          )}
          {product.isFeatured && (
            <span className="px-2 py-0.5 bg-primary-400 text-white text-xs rounded-full font-medium">Featured</span>
          )}
        </div>
        {/* Wishlist */}
        {onWishlistToggle && (
          <button
            onClick={(e) => { e.preventDefault(); onWishlistToggle(product._id); }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-110 transition-transform"
          >
            <FiHeart className={isWishlisted ? 'fill-primary-400 text-primary-400' : ''} size={18} />
          </button>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <Link to={`/product/${product._id}`}>
          <h3 className="font-semibold text-lg truncate hover:text-primary-400 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-500">₹{product.price}</span>
            {product.rating > 0 && (
              <span className="flex items-center gap-1 text-sm text-yellow-500">
                <FiStar className="fill-yellow-400" size={14} />
                {product.rating}
              </span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 text-white hover:from-primary-500 hover:to-primary-600 transition-all shadow-md"
          >
            <FiShoppingCart size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
