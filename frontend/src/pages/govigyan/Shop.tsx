import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../../components/FadeIn';
import { CloudinaryImage } from '../../components/CloudinaryImage';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';

const GovigyanShop = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default'); // 'default', 'price-low', 'price-high', 'title-asc', 'title-desc'

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        // Filter strictly if other entries exist (case-insensitive)
        setProducts(data.filter((p: any) => p.category?.toLowerCase() === 'govigyan'));
      } catch (error) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string, title: string } | null>(null);

  const handleDeleteInitiate = (e: React.MouseEvent, id: string, title: string) => {
    e.stopPropagation();
    setProductToDelete({ id, title });
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/products/${productToDelete.id}`);
      setProducts(prev => prev.filter(p => p._id !== productToDelete.id));
      showToast(`Product deleted successfully`, 'success');
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Failed to delete product', 'error');
    }
  };

  // Compute filtered and sorted products
  const displayedProducts = useMemo(() => {
    let result = [...products];

    // 1. Search Filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title?.toLowerCase().includes(lowerQuery) || 
        p.description?.toLowerCase().includes(lowerQuery)
      );
    }

    // 2. Sort Logic
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-high':
        result.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'title-asc':
        result.sort((a, b) => a.title?.localeCompare(b.title));
        break;
      case 'title-desc':
        result.sort((a, b) => b.title?.localeCompare(a.title));
        break;
      default:
        // default uses original order, which matches 'products' state
        break;
    }

    return result;
  }, [products, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        <FadeIn>
          <div className="mb-8 md:mb-10 text-center md:text-left border-b border-[var(--color-border-soft)] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
             <div>
               <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-text)] tracking-tight">
                  Govigyan Shop
               </h1>
               <p className="mt-3 text-[var(--color-text)]/70 max-w-2xl text-lg">
                  Explore our ethically sourced, premium authentic products curated directly from nature constraints.
               </p>
             </div>

             {/* Controls (Search & Sort) */}
             <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-4 md:mt-0">
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-text)] placeholder-[var(--color-text)]/40 focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text)]/40 hover:text-[var(--color-text)]/80"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border-soft)] text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-colors cursor-pointer appearance-none pr-10"
                  style={{
                     backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
                     backgroundRepeat: 'no-repeat',
                     backgroundPosition: 'right 1rem center',
                     backgroundSize: '1em'
                  }}
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title-asc">Name: A to Z</option>
                  <option value="title-desc">Name: Z to A</option>
                </select>
             </div>
          </div>
        </FadeIn>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, i) => (
              <SkeletonLoader key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    key={product._id}
                    onClick={() => navigate(`/govigyan/shop/${product._id}`)}
                    className="group relative flex flex-col h-full overflow-hidden rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-soft)] cursor-pointer hover:shadow-[0_15px_30px_-10px_var(--color-primary)] hover:-translate-y-1 hover:border-[var(--color-primary)]/40"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-square w-full overflow-hidden bg-[var(--color-surface-soft)]">
                      <div className="w-full h-full transform transition-transform duration-500 ease-out group-hover:scale-105">
                           <CloudinaryImage 
                              imageUrl={product.image} 
                              alt={product.title} 
                              className="h-full w-full object-cover"
                           />
                      </div>
                    </div>
                    
                    {/* Text Container */}
                    <div className="flex flex-col flex-grow p-5 relative">
                      {user?.role === 'admin' && (
                         <button 
                           onClick={(e) => handleDeleteInitiate(e, product._id, product.title)}
                           className="absolute top-4 right-4 z-20 rounded-lg bg-red-500/10 border border-red-500/30 p-2 text-red-500 hover:bg-red-500/20 transition-all shadow-[0_0_10px_-5px_red]"
                           title="Delete Product"
                         >
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                         </button>
                      )}
                      <h3 className="text-lg font-bold text-[var(--color-text)] leading-snug line-clamp-2 pr-8 mb-2 transition-colors group-hover:text-[var(--color-primary)]">
                         {product.title}
                      </h3>
                      
                      <div className="mt-auto pt-2 flex items-baseline gap-2">
                         <span className="text-xl font-black tracking-tight text-[var(--color-text)]">
                            ₹{product.price || '0'}
                         </span>
                         {product.originalPrice && (
                             <span className="text-sm font-semibold tracking-tight text-[var(--color-text)]/40 line-through">
                                ₹{product.originalPrice}
                             </span>
                         )}
                      </div>

                      {/* Stock subtle indicator */}
                      {product.stock && (
                         <span className="text-xs font-semibold text-green-500 mt-2 block">
                            {product.stock.toLowerCase().includes('in stock') ? 'In Stock' : product.stock}
                         </span>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 flex flex-col items-center justify-center py-24 text-center"
                >
                   <h3 className="text-2xl font-bold text-[var(--color-text)] mb-2">No products found</h3>
                   <p className="text-[var(--color-text)]/60">Try adjusting your search or filter requirements.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <DeleteConfirmModal 
        isOpen={deleteModalOpen}
        productName={productToDelete?.title || ''}
        onClose={() => {
            setDeleteModalOpen(false);
            setProductToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default GovigyanShop;
