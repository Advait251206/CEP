import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FadeIn } from '../../components/FadeIn';
import { Navigate } from 'react-router-dom';
import api from '../../services/api';

export default function AdminDashboard() {
    const { user } = useAuth();
    const { showToast } = useToast();

    const [uploading, setUploading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        category: 'anandwan',
        description: '',
        ingredients: '',
        howToUse: '',
        stock: 'In Stock',
        stockCount: 1,
        originalPrice: '',
        price: '',
    });

    if (user?.role !== 'admin') {
        return <Navigate to="/auth" />;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!imageFile) {
            showToast('An image is required.', 'error');
            return;
        }

        setUploading(true);
        try {
            // First: Upload image to our /api/upload endpoint
            const formObj = new FormData();
            formObj.append('image', imageFile);

            const uploadRes = await api.post('/upload', formObj, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const imageUrl = uploadRes.data.imageUrl;

            // Second: Post actual product
            const { data } = await api.post('/products', {
                ...formData,
                image: imageUrl,
                price: Number(formData.price),
                stockCount: Number(formData.stockCount),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined
            });

            showToast(`Product "${data.title}" successfully launched!`, 'success');

            // Reset form
            setFormData({
                title: '',
                category: 'anandwan',
                description: '',
                ingredients: '',
                howToUse: '',
                stock: 'In Stock',
                stockCount: 1,
                originalPrice: '',
                price: '',
            });
            setImageFile(null);
            setImagePreview(null);
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to deploy product', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <div className="mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-black tracking-widest uppercase mb-4 shadow-[0_0_20px_-5px_red]">
                            Level 5 Clearance
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] tracking-tight">Deployment Hub</h1>
                        <p className="mt-3 text-[var(--color-text)]/50 text-lg">Push new product containers directly to the live platform.</p>
                    </div>

                    <div className="bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)] opacity-10 rounded-full blur-3xl translate-x-10 -translate-y-10"></div>
                        
                        <form onSubmit={handleProductSubmit} className="space-y-6 relative z-10">
                            
                            {/* Top Tier: Image & Core Info */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-4 flex flex-col space-y-2">
                                    <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase cursor-pointer h-full border-2 border-dashed border-[var(--color-border-soft)] rounded-2xl flex flex-col items-center justify-center bg-[var(--color-surface-soft)] hover:border-[var(--color-primary)] transition-all min-h-[220px] overflow-hidden">
                                        {imagePreview ? (
                                            <div className="w-full h-full p-2">
                                                <img src={imagePreview} className="w-full h-full object-cover rounded-xl" alt="Preview" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-2 p-6 text-[var(--color-text)]/50">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                                                <span className="text-center mt-2">Click to Upload<br/>Primary Thumbnail</span>
                                            </div>
                                        )}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                    </label>
                                </div>

                                <div className="lg:col-span-8 space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Product Title</label>
                                            <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Platform Target</label>
                                            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]">
                                                <option value="anandwan">Anandwan Platform</option>
                                                <option value="govigyan">Govigyan Environment</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Original Price (₹)</label>
                                            <input type="number" value={formData.originalPrice} onChange={e => setFormData({...formData, originalPrice: e.target.value})} placeholder="Optional MSRP" className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase text-green-500">Launch Price (₹)</label>
                                            <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors text-[var(--color-text)] font-black" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Stock Status</label>
                                            <select value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]">
                                                <option value="In Stock">In Stock</option>
                                                <option value="Low Stock">Low Stock</option>
                                                <option value="Out of Stock">Out of Stock</option>
                                            </select>
                                        </div>
                                        {formData.stock !== 'Out of Stock' && (
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Unit Count</label>
                                                <input type="number" min="1" required value={formData.stockCount} onChange={e => setFormData({...formData, stockCount: Number(e.target.value)})} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)] font-black" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Deep Detail Info */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Full Description</label>
                                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)] resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Ingredients (Optional)</label>
                                    <textarea value={formData.ingredients} onChange={e => setFormData({...formData, ingredients: e.target.value})} rows={2} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)] resize-none" placeholder="Primary components..." />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">How To Use (Optional)</label>
                                    <textarea value={formData.howToUse} onChange={e => setFormData({...formData, howToUse: e.target.value})} rows={2} className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)] resize-none" placeholder="Application instructions..." />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-[var(--color-border-soft)]">
                                <button type="submit" disabled={uploading} className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[var(--color-primary)] text-white font-black tracking-[0.2em] uppercase hover:brightness-110 shadow-[0_4px_20px_0_var(--color-primary-soft)] transition-all disabled:opacity-50">
                                    {uploading ? 'Deploying to live...' : 'Deploy Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
