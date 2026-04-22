import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Layout
import MainLayout from './layouts/MainLayout';

// Anandwan Pages
import AnandwanHome from './pages/anandwan/Home';
import AnandwanAbout from './pages/anandwan/About';
import AnandwanShop from './pages/shared/Products';
import Impact from './pages/anandwan/Impact';
import Gallery from './pages/anandwan/Gallery';

// Govigyan Pages
import GovigyanHome from './pages/govigyan/Home';
import GovigyanAbout from './pages/govigyan/About';
import GovigyanAgriculture from './pages/govigyan/Agriculture';
import GovigyanLivestock from './pages/govigyan/Livestock';
import GovigyanShop from './pages/govigyan/Shop';
import GovigyanProductDetail from './pages/govigyan/ProductDetail';

// Shared Commerce / Auth Pages
import Auth from './pages/shared/Auth';
import Checkout from './pages/shared/Checkout';
import Contact from './pages/shared/Contact';
import OrderSuccess from './pages/shared/OrderSuccess';
import Settings from './pages/shared/Settings';
import AdminDashboard from './pages/shared/AdminDashboard';
import { useAuth } from './context/AuthContext';

const SiteRouter = () => {
  const { setTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/govigyan')) {
      setTheme('govigyan');
      document.title = 'Govigyan';
    } else if (location.pathname.startsWith('/anandwan')) {
      setTheme('anandwan');
      document.title = 'Anandwan';
    }
  }, [location.pathname, setTheme]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/govigyan/home" />} />
      <Route element={<MainLayout />}>
        {/* Anandwan Route Group */}
        <Route path="/anandwan/home" element={<AnandwanHome />} />
        <Route path="/anandwan/about" element={<AnandwanAbout />} />
        <Route path="/anandwan/shop" element={<AnandwanShop />} />
        <Route path="/anandwan/impact" element={<Impact />} />
        <Route path="/anandwan/gallery" element={<Gallery />} />
        <Route path="/anandwan/contact" element={<Contact />} />

        {/* Govigyan Route Group */}
        <Route path="/govigyan/home" element={<GovigyanHome />} />
        <Route path="/govigyan/about" element={<GovigyanAbout />} />
        <Route path="/govigyan/agriculture" element={<GovigyanAgriculture />} />
        <Route path="/govigyan/livestock" element={<GovigyanLivestock />} />
        <Route path="/govigyan/shop" element={<GovigyanShop />} />
        <Route path="/govigyan/shop/:id" element={<GovigyanProductDetail />} />
        <Route path="/govigyan/contact" element={<Contact />} />

        {/* Global Commerce & Auth Routes */}
        <Route path="/auth" element={<Auth />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/auth" />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/success" element={<OrderSuccess />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

import { ToastProvider } from './context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            <Router>
              <SiteRouter />
            </Router>
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
