import { useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

const Navbar = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  return (
    <nav className="pointer-events-auto fixed top-0 z-50 flex w-full justify-center transition-all duration-300">
      {/* Background Gradient for visibility */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[color:var(--color-background)]/96 via-[color:var(--color-background)]/75 to-transparent" />

      <div className="mt-3 flex w-full max-w-[1800px] items-center justify-between gap-8 rounded-2xl border border-[color:var(--color-border-soft)] bg-[color:var(--color-background)]/78 px-8 py-5 shadow-[0_10px_40px_-24px_var(--color-primary)] backdrop-blur-xl md:px-12 xl:px-16">
        <div className="shrink-0 text-4xl font-black tracking-tighter text-[var(--color-text)] whitespace-nowrap">
          {theme === 'govigyan' ? 'GOVIGYAN' : 'ANANDWAN'} <span className="font-light">Platform</span>
        </div>
      
        <div className="flex flex-1 justify-end gap-6 xl:gap-8 items-center text-sm lg:text-base font-semibold tracking-wider uppercase text-[var(--color-text)]">
          {theme === 'anandwan' ? (
            <>
              <Link to="/anandwan/home" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Home</Link>
              <Link to="/anandwan/about" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">About</Link>
              <Link to="/anandwan/shop" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Shop</Link>
              <Link to="/anandwan/impact" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Impact</Link>
              <Link to="/anandwan/gallery" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Gallery</Link>
              <Link to="/anandwan/contact" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Contact</Link>
              <a 
                href="/govigyan/home" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-2 whitespace-nowrap rounded-full border border-[color:var(--color-border-soft)] bg-[color:var(--color-surface)]/85 px-5 py-3 text-[var(--color-text)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[color:var(--color-surface-soft)] xl:ml-4"
              >
                Govigyan Project
              </a>
            </>
          ) : (
            <>
              <Link to="/govigyan/home" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Home</Link>
              <Link to="/govigyan/about" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Our Soil</Link>
              <Link to="/govigyan/agriculture" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Agriculture</Link>
              <Link to="/govigyan/livestock" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Livestock</Link>
              <Link to="/govigyan/shop" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Shop</Link>
              <Link to="/govigyan/contact" className="transition-colors hover:text-[var(--color-accent)] whitespace-nowrap">Contact</Link>
              <a 
                href="/anandwan/home" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="ml-2 whitespace-nowrap rounded-full border border-[color:var(--color-border-soft)] bg-[color:var(--color-surface)]/85 px-5 py-3 text-[var(--color-text)] shadow-sm transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:bg-[color:var(--color-surface-soft)] xl:ml-4"
              >
                Anandwan Root
              </a>
            </>
          )}

          {/* Authentication & Cart Module */}
          <div className="ml-4 flex items-center gap-6 pl-4 border-l border-[var(--color-border-soft)] whitespace-nowrap">
            {user ? (
              <>
                <Link to="/settings" className="transition-colors hover:text-[var(--color-accent)]">
                  Settings
                </Link>
                <Link to="/checkout" className="relative transition-colors hover:text-[var(--color-accent)]">
                  Cart
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-xs font-bold text-white shadow-md">
                      {cartCount}
                    </span>
                  )}
                </Link>
                <button 
                  onClick={logout}
                  className="transition-colors hover:text-[var(--color-accent)] ml-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/auth" className="transition-colors hover:text-[var(--color-accent)]">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function MainLayout() {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--color-background)] text-[var(--color-text)] selection:bg-[color:var(--color-accent)]/35 font-sans">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
