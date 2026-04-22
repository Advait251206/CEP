import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { FadeIn } from '../../components/FadeIn';
import { CloudinaryImage } from '../../components/CloudinaryImage';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<{ id: string, title: string } | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = (product: any) => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    // navigate to checkout or open cart
    showToast('Added to cart!', 'success');
  };

  const handleDeleteInitiate = (id: string, title: string) => {
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

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-8 py-20">
      <FadeIn>
        <h1 className="text-4xl font-bold mb-12 text-center text-[var(--color-primary)]">
          Impact Products
        </h1>
      </FadeIn>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1,2,3].map(i => <SkeletonLoader key={i} className="h-96 w-full" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <FadeIn key={product._id} delay={idx * 0.1} className="relative overflow-hidden rounded-2xl border border-[color:var(--color-border-soft)] bg-[linear-gradient(140deg,var(--color-card-a)_0%,var(--color-card-b)_58%,var(--color-card-c)_100%)] shadow-[0_12px_30px_-18px_var(--color-primary)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_45px_-20px_var(--color-primary)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-glow),transparent_58%)]" />
              <div className="pointer-events-none absolute left-4 top-4 h-1.5 w-14 rounded-full bg-[var(--color-chip)]/90" />
              <CloudinaryImage imageUrl={product.image} alt={product.title} className="h-64" />
              <div className="relative p-6">
                {user?.role === 'admin' && (
                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteInitiate(product._id, product.title);
                      }}
                       className="absolute top-4 right-4 z-50 rounded-lg bg-red-600 border border-red-500 p-2.5 text-white hover:bg-red-700 transition-all shadow-[0_0_20px_-5px_rgba(220,38,38,0.5)]"
                       title="Delete Product"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                )}
                <h3 className="mb-2 text-2xl pr-10 font-bold text-[var(--color-text)]">{product.title}</h3>
                <p className="mb-4 h-12 overflow-hidden text-[var(--color-text)]/75">{product.description}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xl font-bold text-[var(--color-primary)]">₹{product.price}</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleBuy(product)}
                      className="rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-6 py-2 font-bold text-white transition hover:brightness-95"
                      style={{ backgroundColor: 'var(--color-accent)' }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      )}

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

export default Products;
