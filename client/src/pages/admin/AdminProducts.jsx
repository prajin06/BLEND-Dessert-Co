import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiArrowLeft, FiX } from 'react-icons/fi';
import api from '../../services/api';
import { CATEGORIES, pageTransition } from '../../utils/constants';
import toast from 'react-hot-toast';

const emptyProduct = { name: '', description: '', price: '', category: 'Milkshakes', images: [''], stock: 50, isVeg: true, isFeatured: false };

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);

  const fetchProducts = () => {
    api.get('/products?limit=100').then(({ data }) => { setProducts(data.data); setLoading(false); });
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => { setForm(emptyProduct); setEditing(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ ...p, images: p.images?.length ? p.images : [''] }); setEditing(p._id); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
      if (editing) {
        await api.put(`/products/${editing}`, payload);
        toast.success('Product updated');
      } else {
        await api.post('/products', payload);
        toast.success('Product created');
      }
      setShowModal(false);
      fetchProducts();
    } catch (err) { toast.error(err.response?.data?.message || 'Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success('Deleted');
      fetchProducts();
    } catch { toast.error('Failed'); }
  };

  return (
    <motion.div {...pageTransition} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-gray-400 hover:text-primary-400"><FiArrowLeft size={20} /></Link>
          <h1 className="text-3xl font-bold">Manage <span className="text-gradient">Products</span></h1>
        </div>
        <button onClick={openCreate} className="btn-primary flex items-center gap-2"><FiPlus /> Add Product</button>
      </div>

      {loading ? (
        <div className="space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="skeleton h-16" />)}</div>
      ) : (
        <div className="space-y-3">
          {products.map((p) => (
            <div key={p._id} className="glass-card p-4 flex items-center gap-4">
              <img src={p.images?.[0] || 'https://via.placeholder.com/60'} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{p.name}</h3>
                <p className="text-xs text-gray-500">{p.category} • ₹{p.price} • Stock: {p.stock}</p>
              </div>
              <div className="flex items-center gap-2">
                {p.isVeg ? <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Veg</span> : <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Non-Veg</span>}
                <button onClick={() => openEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"><FiEdit2 size={16} /></button>
                <button onClick={() => handleDelete(p._id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><FiTrash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="glass-card p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{editing ? 'Edit' : 'Add'} Product</h2>
                <button onClick={() => setShowModal(false)}><FiX size={20} /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input type="text" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" required />
                <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="input-field" rows={3} required />
                <div className="grid grid-cols-2 gap-3">
                  <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="input-field" required />
                  <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} className="input-field" />
                </div>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input-field">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="url" placeholder="Image URL" value={form.images?.[0] || ''} onChange={(e) => setForm({ ...form, images: [e.target.value] })} className="input-field" />
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isVeg} onChange={(e) => setForm({ ...form, isVeg: e.target.checked })} className="accent-green-500" /> Veg
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-primary-400" /> Featured
                  </label>
                </div>
                <button type="submit" className="btn-primary w-full">{editing ? 'Update' : 'Create'} Product</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminProducts;
