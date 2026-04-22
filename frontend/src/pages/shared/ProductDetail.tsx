import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { useTheme } from '../../context/ThemeContext';
import { FadeIn } from '../../components/FadeIn';
import { CloudinaryImage } from '../../components/CloudinaryImage';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import api from '../../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen py-32 px-6 max-w-7xl mx-auto flex gap-12">
        <SkeletonLoader className="w-1/2 h-[600px] rounded-[3rem]" />
        <div className="w-1/2 flex flex-col gap-6 mt-12">
          <SkeletonLoader className="h-16 w-3/4" />
          <SkeletonLoader className="h-8 w-1/4" />
          <SkeletonLoader className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center text-3xl font-bold">Product not found.</div>;
  }

  // Determine cloudinary folder strategy based on product structure or theme.
  // Assuming backend returns a raw filename for Cloudinary
  const imageName = product.image.includes('http') ? product.image : product.image || 'placeholder_product.jpg';

  return (
    <div className="min-h-screen max-w-7xl mx-auto flex flex-col items-start gap-16 px-6 py-32 md:flex-row md:px-20">
      <FadeIn className="w-full md:w-1/2 sticky top-32">
         {imageName.includes('http') ? (
            <img src={imageName} alt={product.title} className="h-[600px] w-full rounded-[3rem] border border-[color:var(--color-border-soft)] object-cover shadow-lg" />
         ) : (
            <CloudinaryImage 
              imageUrl={imageName}
              alt={product.title}
              className="h-[600px] w-full rounded-[3rem] border border-[color:var(--color-border-soft)] object-cover shadow-lg"
            />
         )}
      </FadeIn>
      
      <FadeIn delay={0.2} className="w-full md:w-1/2 pt-10">
        <Link to={`/${theme}/products`} className="text-[var(--color-secondary)] font-bold mb-8 inline-block hover:underline">
          &larr; Back to Catalog
        </Link>
        <h1 className="text-5xl md:text-7xl font-black mb-6 text-[var(--color-primary)] leading-tight">
          {product.title}
        </h1>
        <p className="text-4xl font-bold mb-8 text-[var(--color-text)] opacity-90">
          ₹{product.price}
        </p>
        
        <div className="my-8 h-px w-full bg-[color:var(--color-border-soft)]"></div>
        
        <p className="text-xl leading-relaxed opacity-80 mb-12 text-[var(--color-text)]">
          {product.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
            <div className="flex items-center gap-3 bg-[var(--color-surface)] border border-[color:var(--color-border-soft)] rounded-full px-4 py-2 shrink-0">
                <button 
                    onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                    className="w-10 h-10 rounded-full text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-border-soft)] transition-colors text-xl"
                >
                    -
                </button>
                <span className="text-[var(--color-text)] font-black w-8 text-center text-xl">{localQuantity}</span>
                <button 
                    onClick={() => setLocalQuantity(localQuantity + 1)}
                    className="w-10 h-10 rounded-full text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-border-soft)] transition-colors text-xl"
                >
                    +
                </button>
            </div>

            <button 
              onClick={() => {
                addToCart({
                  productId: product._id,
                  title: product.title,
                  price: product.price,
                  quantity: localQuantity,
                  image: product.image,
                });
                showToast('Added to your cart!', 'success');
              }}
              className="flex-1 rounded-full bg-[var(--color-accent)] py-6 text-2xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--color-accent)' }}
            >
              Add to Cart
            </button>
        </div>

        <div className="mt-12 rounded-3xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-surface)]/40 p-8">
          <h3 className="font-bold text-xl mb-2 text-[var(--color-primary)]">Impact Guaranteed</h3>
          <p className="text-[var(--color-text)]/80">100% of the proceeds from this purchase go directly to the artisans and farmers responsible for creating it.</p>
        </div>
      </FadeIn>
    </div>
  );
};

export default ProductDetail;
