import { createContext, useContext, useState, useEffect, type ReactNode, useRef } from 'react';
import { useAuth } from './AuthContext';
import api from '../services/api';

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const isInitialCloudSyncDone = useRef(false);

  // 1) Pull cart from database ONCE if authenticated
  useEffect(() => {
    if (token && user && !isInitialCloudSyncDone.current) {
      const fetchCart = async () => {
        try {
          const { data } = await api.get('/cart', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (data.cart && data.cart.length > 0) {
              setCart(data.cart);
          }
          isInitialCloudSyncDone.current = true;
        } catch (err) {
          console.error("Failed to load cloud cart", err);
        }
      };
      // Give Auth context a slight moment to settle if just booted
      setTimeout(fetchCart, 100);
    }
  }, [token, user]);

  // 2) Save to database and local storage whenever cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (token && isInitialCloudSyncDone.current) {
      // Sync straight to MongoDB dynamically
      const syncToCloud = async () => {
         try {
           await api.post('/cart/sync', { cart }, {
             headers: { Authorization: `Bearer ${token}` }
           });
         } catch (err) {
           console.error("Cloud cart sync failed", err);
         }
      };
      
      const timerId = setTimeout(syncToCloud, 500); // Debounce network syncs
      return () => clearTimeout(timerId);
    }
  }, [cart, token]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.productId === item.productId);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.productId === item.productId
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        return prevCart.filter(item => item.productId !== productId);
      }
      return prevCart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
