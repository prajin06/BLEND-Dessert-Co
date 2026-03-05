import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiHeart, FiUser, FiSun, FiMoon, FiMenu, FiX, FiLogOut, FiGrid } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const { totalItems } = useCart();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <span className="text-xl font-bold text-gradient hidden sm:block">BLEND</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="text-sm font-medium hover:text-primary-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {user && (
              <Link to="/wishlist" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <FiHeart size={20} />
              </Link>
            )}

            <Link to="/cart" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
              <FiShoppingCart size={20} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary-400 text-white text-xs rounded-full flex items-center justify-center font-bold"
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                {isAdmin && (
                  <Link to="/admin" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" title="Admin">
                    <FiGrid size={20} />
                  </Link>
                )}
                <Link to="/profile" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiUser size={20} />
                </Link>
                <button onClick={handleLogout} className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <FiLogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block btn-primary text-sm !py-2 !px-4">
                Login
              </Link>
            )}

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2">
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setMobileOpen(false)} className="block py-2 font-medium hover:text-primary-400">
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setMobileOpen(false)} className="block py-2 font-medium hover:text-primary-400">Profile</Link>
                  {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 font-medium hover:text-primary-400">Admin Dashboard</Link>}
                  <button onClick={handleLogout} className="block py-2 font-medium text-red-500">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="block btn-primary text-center text-sm">Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
