import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { FadeIn } from '../../components/FadeIn';
import api from '../../services/api';

export default function Settings() {
    const { user, updateUser } = useAuth();
    const { showToast } = useToast();
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        age: ''
    });
    
    const [securityData, setSecurityData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Admin Grant State
    const [adminGrantData, setAdminGrantData] = useState({ 
        targetEmail: '', 
        adminPassword: '' 
    });
    const [grantingAdmin, setGrantingAdmin] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get('/auth/profile');
                setFormData({
                    name: data.name || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    address: data.address || '',
                    age: data.age?.toString() || ''
                });
                // Update local context just in case backend has newer data
                updateUser(data);
            } catch (error) {
                showToast('Failed to load profile data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [updateUser, showToast]);

    const handleProfileSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const { data } = await api.put('/auth/profile', {
                ...formData,
                age: formData.age ? parseInt(formData.age) : undefined
            });
            updateUser(data);
            showToast('Profile updated successfully', 'success');
        } catch (error: any) {
             showToast(error.response?.data?.message || 'Failed to update profile', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleSecuritySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (securityData.password !== securityData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        setSaving(true);
        try {
            const { data } = await api.put('/auth/profile', {
                password: securityData.password
            });
            updateUser(data);
            showToast('Password updated successfully', 'success');
            setSecurityData({ password: '', confirmPassword: '' }); // Clear
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to update password', 'error');
        } finally {
            setSaving(false);
        }
    };

    const handleMakeAdminSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGrantingAdmin(true);
        try {
            const { data } = await api.post('/auth/make-admin', adminGrantData);
            showToast(data.message, 'success');
            setAdminGrantData({ targetEmail: '', adminPassword: '' });
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to grant admin privileges', 'error');
        } finally {
            setGrantingAdmin(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20 flex items-center justify-center">
                <div className="text-[var(--color-text)] opacity-50 font-bold text-xl tracking-widest uppercase">Initializing...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--color-bg)] pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                <FadeIn>
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] tracking-tight">Account Settings</h1>
                        <p className="mt-3 text-[var(--color-text)]/50 text-lg">Manage your personal preferences and security credentials.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Profile Details Column */}
                        <div className="lg:col-span-7">
                            <div className="bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Personal Information</h2>
                                
                                <form onSubmit={handleProfileSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Full Name</label>
                                            <input 
                                                type="text" 
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Age</label>
                                            <input 
                                                type="number" 
                                                value={formData.age}
                                                onChange={(e) => setFormData({...formData, age: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]"
                                                placeholder="e.g. 25"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Email Address (Locked)</label>
                                            <input 
                                                type="email" 
                                                value={formData.email}
                                                disabled
                                                className="w-full bg-[var(--color-surface-soft)]/50 border border-[var(--color-border-soft)]/50 rounded-xl px-4 py-3 text-[var(--color-text)]/50 cursor-not-allowed"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Phone Number</label>
                                            <input 
                                                type="tel" 
                                                value={formData.phone}
                                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]"
                                                placeholder="+91..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Delivery Address</label>
                                        <textarea 
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            rows={3}
                                            className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)] resize-none"
                                            placeholder="Enter your full shipping address..."
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="w-full sm:w-auto mt-4 px-8 py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-black tracking-wide hover:brightness-110 shadow-[0_4px_14px_0_var(--color-primary-soft)] transition-all disabled:opacity-50"
                                    >
                                        Save Profile Changes
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Security Column */}
                        <div className="lg:col-span-5">
                            <div className="bg-[var(--color-surface)] border border-[var(--color-border-soft)] rounded-3xl p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Security</h2>
                                
                                <form onSubmit={handleSecuritySubmit} className="space-y-5">
                                    <div className="space-y-1.5 relative">
                                        <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">New Password</label>
                                        <div className="relative">
                                            <input 
                                                type={showPassword ? "text" : "password"} 
                                                value={securityData.password}
                                                onChange={(e) => setSecurityData({...securityData, password: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text)]/40 hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 relative">
                                        <label className="text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase">Confirm Password</label>
                                        <div className="relative">
                                            <input 
                                                type={showConfirmPassword ? "text" : "password"} 
                                                value={securityData.confirmPassword}
                                                onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text)]"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button 
                                                type="button" 
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-text)]/40 hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                                            >
                                                {showConfirmPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                                )}
                                            </button>
                                        </div>
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={saving}
                                        className="w-full mt-4 px-8 py-3.5 rounded-xl bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] text-[var(--color-text)] font-black tracking-wide hover:bg-[var(--color-text)] hover:text-[var(--color-surface)] transition-all disabled:opacity-50"
                                    >
                                        Update Password
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Admin Access Panel */}
                    {user?.role === 'admin' && (
                        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                            <div className="lg:col-span-7">
                                <div className="bg-[var(--color-surface)] border-2 border-[var(--color-primary)]/30 rounded-3xl p-8 shadow-[0_10px_30px_-15px_var(--color-primary)] relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent opacity-50"></div>
                                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2 flex items-center gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-primary)]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                                        Administration Hub
                                    </h2>
                                    <p className="text-[var(--color-text)]/60 mb-6 text-sm">Deploy new products and manage inventory natively.</p>
                                    
                                    <Link to="/admin/dashboard" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--color-primary)] text-white font-black tracking-wide hover:brightness-110 shadow-[0_4px_14px_0_var(--color-primary-soft)] transition-all">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                        Upload / Manage Products
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="lg:col-span-5">
                                <div className="bg-[var(--color-surface)] border border-red-500/20 rounded-3xl p-8 shadow-lg">
                                    <h2 className="text-xl font-bold text-[var(--color-text)] mb-2 text-red-500/90">Grant Admin Privileges</h2>
                                    <p className="text-[var(--color-text)]/50 text-xs mb-6">Promote another registered user to Admin role.</p>
                                    <form onSubmit={handleMakeAdminSubmit} className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold tracking-wider text-[var(--color-text)]/60 uppercase">Target Email</label>
                                            <input 
                                                type="email" 
                                                value={adminGrantData.targetEmail}
                                                onChange={(e) => setAdminGrantData({...adminGrantData, targetEmail: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500/50 transition-colors text-[var(--color-text)] text-sm"
                                                placeholder="user@example.com"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[11px] font-bold tracking-wider text-[var(--color-text)]/60 uppercase">Your Security Password</label>
                                            <input 
                                                type="password" 
                                                value={adminGrantData.adminPassword}
                                                onChange={(e) => setAdminGrantData({...adminGrantData, adminPassword: e.target.value})}
                                                className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-lg px-4 py-2.5 focus:outline-none focus:border-red-500/50 transition-colors text-[var(--color-text)] text-sm"
                                                placeholder="••••••••"
                                                required
                                            />
                                        </div>
                                        <button 
                                            type="submit" 
                                            disabled={grantingAdmin}
                                            className="w-full mt-2 px-6 py-2.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 font-bold text-sm tracking-wide hover:bg-red-500/20 transition-all disabled:opacity-50"
                                        >
                                            {grantingAdmin ? 'Authorizing...' : 'Promote to Admin'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </FadeIn>
            </div>
        </div>
    );
}
