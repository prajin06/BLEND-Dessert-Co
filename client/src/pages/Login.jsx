import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { pageTransition } from '../utils/constants';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <motion.div {...pageTransition} className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="glass-card p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">B</div>
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your BLEND account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field !pl-11" required />
          </div>
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field !pl-11" required />
          </div>
          <motion.button whileTap={{ scale: 0.97 }} type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign In'}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Don't have an account? <Link to="/register" className="text-primary-400 hover:text-primary-500 font-medium">Register</Link>
        </p>
        <p className="text-center text-xs mt-3 text-gray-400">Admin: admin@blend.com / admin123</p>
      </div>
    </motion.div>
  );
};

export default Login;
