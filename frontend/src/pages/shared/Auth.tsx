import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './../../context/AuthContext';
import api from './../../services/api';

import { useTheme } from './../../context/ThemeContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData;

      const { data } = await api.post(endpoint, payload);
      
      // Store user and token using context
      login({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }, data.token);

      if (window.history.length > 2) {
        navigate(-1); 
      } else {
        navigate(`/${theme}/home`);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[color:var(--color-background)] py-20 px-6 relative overflow-hidden pt-32">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[color:var(--color-glow)] via-[color:var(--color-background)]/80 to-[color:var(--color-background)] opacity-50 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-glow)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-glow)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-xl bg-[color:var(--color-surface)]/60 border border-[color:var(--color-border-soft)] p-8 md:p-10 rounded-3xl shadow-[0_20px_50px_-20px_var(--color-primary)]">
          
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-[var(--color-text)] tracking-tight mb-2">
              {isLogin ? 'Access Hub' : 'Register Identity'}
            </h1>
            <p className="text-sm font-light text-[var(--color-muted-on-dark)]">
              {isLogin ? 'Enter your credentials to continue.' : 'Join the network to acquire impact products.'}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-wide text-[var(--color-muted-on-dark)] uppercase">Full Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[color:var(--color-background)]/50 border border-[color:var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/50 transition-all text-[var(--color-text)] placeholder-[var(--color-muted-on-dark)]/40 text-sm"
                  placeholder="Ex. Aditi Sharma"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide text-[var(--color-muted-on-dark)] uppercase">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-[color:var(--color-background)]/50 border border-[color:var(--color-border-soft)] rounded-xl px-4 py-3 focus:outline-none focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/50 transition-all text-[var(--color-text)] placeholder-[var(--color-muted-on-dark)]/40 text-sm"
                placeholder="inquiry@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-wide text-[var(--color-muted-on-dark)] uppercase">Password</label>
              <div className="relative">
                 <input 
                   type={showPassword ? "text" : "password"} 
                   value={formData.password}
                   onChange={(e) => setFormData({...formData, password: e.target.value})}
                   className="w-full bg-[color:var(--color-background)]/50 border border-[color:var(--color-border-soft)] rounded-xl px-4 py-3 pr-12 focus:outline-none focus:border-[var(--color-accent)]/80 focus:ring-1 focus:ring-[var(--color-accent)]/50 transition-all text-[var(--color-text)] placeholder-[var(--color-muted-on-dark)]/40 text-sm"
                   placeholder="••••••••"
                   required
                 />
                 <button 
                   type="button" 
                   onClick={() => setShowPassword(!showPassword)}
                   className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-on-dark)] border-none bg-transparent hover:text-[var(--color-primary)] transition-colors focus:outline-none"
                 >
                    {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                 </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 mt-4 rounded-xl bg-[color:var(--color-chip)] text-[var(--color-bg-strong)] font-black tracking-widest uppercase text-sm hover:scale-[1.02] shadow-[0_0_20px_var(--color-glow)] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? 'Processing...' : (isLogin ? 'Authenticate' : 'Initialize')}
            </button>
          </form>

          {/* Toggle */}
          <div className="mt-8 text-center text-sm text-[var(--color-muted-on-dark)] font-light">
            {isLogin ? "Don't have an account? " : "Already exist in database? "}
            <button 
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors underline decoration-transparent hover:decoration-[var(--color-accent)] underline-offset-4"
            >
              {isLogin ? 'Register Now' : 'Sign In'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
