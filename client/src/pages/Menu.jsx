import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter, FiX } from 'react-icons/fi';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { CATEGORIES, CATEGORY_EMOJIS, pageTransition } from '../utils/constants';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    params.set('page', page);
    params.set('limit', 12);

    api.get(`/products?${params.toString()}`).then(({ data }) => {
      setProducts(data.data);
      setPagination(data.pagination);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [activeCategory, page, sort, search]);

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat);
    else params.delete('category');
    params.delete('page');
    setSearchParams(params);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (search) params.set('search', search);
    else params.delete('search');
    params.delete('page');
    setSearchParams(params);
  };

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Our <span className="text-gradient">Menu</span></h1>

      {/* Search & Sort Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search desserts, drinks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field !pl-11"
          />
        </form>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="input-field sm:w-48">
          <option value="">Sort by</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
          <option value="name">Name A-Z</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="sm:hidden btn-secondary flex items-center gap-2 justify-center">
          <FiFilter /> Filters
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${!activeCategory ? 'bg-primary-400 text-white shadow-md' : 'glass hover:bg-primary-50 dark:hover:bg-gray-700'}`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1 ${activeCategory === cat ? 'bg-primary-400 text-white shadow-md' : 'glass hover:bg-primary-50 dark:hover:bg-gray-700'}`}
          >
            {CATEGORY_EMOJIS[cat]} {cat}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Showing: <strong>{activeCategory}</strong></span>
          <button onClick={() => setCategory('')} className="text-primary-400 hover:text-primary-500"><FiX size={16} /></button>
        </div>
      )}

      {/* Products Grid */}
      {loading ? (
        <LoadingSkeleton count={8} />
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-6xl mb-4">🍰</p>
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="text-gray-500">Try changing your filters or search term.</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + page + sort}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: pagination.pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set('page', i + 1);
                setSearchParams(params);
              }}
              className={`w-10 h-10 rounded-xl font-medium transition-all ${page === i + 1 ? 'bg-primary-400 text-white shadow-md' : 'glass hover:bg-primary-50 dark:hover:bg-gray-700'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Menu;
