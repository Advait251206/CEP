import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FadeIn } from '../../components/FadeIn';
import { ImageZoomMagnifier } from '../../components/ImageZoomMagnifier';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import api from '../../services/api';

const GovigyanProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Failed to load product detail');
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({
      productId: product._id,
      title: product.title,
      price: product.price,
      quantity: localQuantity,
      image: product.image,
    });
    showToast('Added to Cart', 'success');
  };

  const handleBuyNow = () => {
      handleAddToCart();
      if (user) {
          navigate('/checkout');
      }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] pt-24 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <SkeletonLoader className="aspect-square w-full rounded-2xl" />
            <div className="flex flex-col gap-6">
                 <SkeletonLoader className="h-16 w-3/4" />
                 <SkeletonLoader className="h-8 w-1/4" />
                 <SkeletonLoader className="h-32 w-full" />
                 <SkeletonLoader className="h-16 w-full" />
                 <SkeletonLoader className="h-16 w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
      return (
          <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center pt-32 pb-20">
               <h1 className="text-3xl font-bold text-[var(--color-text)]">Product not found.</h1>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        
        {/* Left Side - Image Magnifier */}
        <div className="lg:col-span-6 xl:col-span-6 relative">
             <div className="sticky top-24">
                 <FadeIn>
                     <ImageZoomMagnifier imageUrl={product.image} alt={product.title} />
                 </FadeIn>
             </div>
        </div>

        {/* Right Side - Amazon Style Stack */}
        <div className="lg:col-span-6 xl:col-span-6 flex flex-col pt-2 lg:pt-8">
            <FadeIn delay={0.1}>
                {/* Title & Price Header */}
                <div className="border-b border-[var(--color-border-soft)] pb-6 mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-text)] tracking-tight leading-tight mb-4">
                        {product.title}
                    </h1>
                    <div className="flex items-end gap-3 mb-2">
                        <span className="text-sm text-[var(--color-text)]/60 font-medium pb-2 tracking-wide uppercase">Price</span>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl text-[var(--color-primary)] font-black tracking-tighter">
                                ₹{product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-2xl text-[var(--color-text)]/40 font-bold line-through">
                                    ₹{product.originalPrice}
                                </span>
                            )}
                        </div>
                    </div>
                    {product.stock && (
                        <div className="mt-2 text-xl font-bold text-green-500 tracking-wide">
                            {product.stock}
                        </div>
                    )}
                </div>

                {/* Content Sections */}
                <div className="space-y-8 text-[var(--color-text)]/80">
                    
                    {product.description && (
                       <section>
                           <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">About this item</h3>
                           <div className="text-base leading-relaxed whitespace-pre-line bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border-soft)] shadow-sm">
                               {product.description}
                           </div>
                       </section>
                    )}

                    {product.ingredients && (
                       <section>
                           <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">Ingredients</h3>
                           <div className="text-base leading-relaxed whitespace-pre-line bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border-soft)] shadow-sm">
                               {product.ingredients}
                           </div>
                       </section>
                    )}

                    {product.howToUse && (
                       <section>
                           <h3 className="text-xl font-bold text-[var(--color-text)] mb-3">How to Use</h3>
                           <div className="text-base leading-relaxed whitespace-pre-line bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border-soft)] shadow-sm">
                               {product.howToUse}
                           </div>
                       </section>
                    )}
                </div>

                {/* Call to Actions (Sticky to bottom on mobile, inline on desktop) */}
                <div className="mt-10 p-6 bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-2xl shadow-lg flex flex-col gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4">
                        <span className="text-[var(--color-text)]/70 font-semibold tracking-wide uppercase text-sm">Quantity:</span>
                        <div className="flex items-center gap-3 bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-xl px-2 py-1">
                            <button 
                                onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                                className="w-8 h-8 rounded-full text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-border-soft)] transition-colors"
                            >
                                -
                            </button>
                            <span className="text-[var(--color-text)] font-black w-6 text-center">{localQuantity}</span>
                            <button 
                                onClick={() => setLocalQuantity(localQuantity + 1)}
                                className="w-8 h-8 rounded-full text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-border-soft)] transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                            onClick={handleAddToCart}
                            className="flex-1 py-4 px-6 rounded-xl font-bold text-lg bg-[var(--color-surface)] text-[var(--color-text)] border-2 border-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all transform hover:scale-[1.02] shadow-[0_4px_14px_0_var(--color-primary-soft)]"
                        >
                            Add to Cart
                        </button>
                        <button 
                            onClick={handleBuyNow}
                            className="flex-1 py-4 px-6 rounded-xl font-bold text-lg text-white bg-[var(--color-primary)] border-2 border-[var(--color-primary)] hover:brightness-110 transition-all transform hover:scale-[1.02] shadow-[0_4px_14px_0_var(--color-primary-soft)]"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </FadeIn>
        </div>

      </div>
    </div>
  );
};

export default GovigyanProductDetail;
