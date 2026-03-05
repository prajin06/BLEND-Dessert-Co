import { Link } from 'react-router-dom';
import { FiInstagram, FiPhone, FiMapPin, FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-chocolate-600 dark:bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">B</div>
              <span className="text-2xl font-bold">BLEND</span>
            </div>
            <p className="text-cream-300 text-sm leading-relaxed">Dessert & Co — Premium desserts, shakes, waffles, and more. Crafted with love in Thanjavur.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-cream-300 hover:text-primary-400 transition-colors text-sm">Home</Link>
              <Link to="/menu" className="block text-cream-300 hover:text-primary-400 transition-colors text-sm">Menu</Link>
              <Link to="/cart" className="block text-cream-300 hover:text-primary-400 transition-colors text-sm">Cart</Link>
              <Link to="/profile" className="block text-cream-300 hover:text-primary-400 transition-colors text-sm">My Account</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm text-cream-300">
              <div className="flex items-start gap-2">
                <FiMapPin className="mt-0.5 flex-shrink-0" />
                <span>30, Nadi Complex, M.C. Road, Thanjavur - 613 007</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="flex-shrink-0" />
                <span>96777 71981</span>
              </div>
              <a href="https://instagram.com/BLENDTNJ" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary-400 transition-colors">
                <FiInstagram className="flex-shrink-0" />
                <span>@BLENDTNJ</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-cream-400">
          <p className="flex items-center justify-center gap-1">
            Made with <FiHeart className="text-primary-400" /> by BLEND Dessert & Co &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
