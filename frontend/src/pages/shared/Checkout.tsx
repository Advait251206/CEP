import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

export default function Checkout() {
  const { cart, totalPrice, clearCart, removeFromCart, updateQuantity } = useCart();
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [checkoutStep, setCheckoutStep] = useState(1);
  const [shipping, setShipping] = useState({ name: '', phone: '', address: '' });
  const [saveToProfile, setSaveToProfile] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      setShipping({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || ''
      });
    }

    // Pre-load Razorpay SDK dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [user, navigate]);

  const handleContinueToReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shipping.name || !shipping.phone || !shipping.address) {
      setError('Please fill out all shipping details.');
      return;
    }
    setError('');
    
    // Optional Profile Synchronization
    if (saveToProfile && token) {
      try {
        await api.put('/auth/profile', shipping, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // We could also call useAuth().updateUser here if we exported it fully mapped, 
        // but just syncing to backend is enough for this simulated UX flow right now.
      } catch (err) {
        console.error("Failed to sync profile"); // Silent fail for UX
      }
    }
    
    setCheckoutStep(2);
  };

  const handlePayment = async () => {
    if (!token) return;
    setLoading(true);
    setError('');

    try {
       // 1. Ask backend to generate an official Razorpay Sandbox Order
       const { data } = await api.post('/payment/create-order', {
           items: cart,
           totalAmount: totalPrice
       }, {
           headers: { Authorization: `Bearer ${token}` }
       });

       // 2. Configure the Razorpay Interface Options using the exact credentials provided by the backend
       const options = {
           key: data.key, // Extracted safely from Backend .env
           amount: data.amount,
           currency: data.currency,
           name: "CEP Network Procurement",
           description: "Simulated Test Transaction",
           image: "https://res.cloudinary.com/dyormiiop/image/upload/v1700000000/logo.png", // Generic logo
           order_id: data.orderId,
           handler: async function (response: any) {
               try {
                   // 3. The SDK caught the dummy success payment. Verify the signature forcefully against our backend.
                   const verify = await api.post('/payment/verify', {
                       razorpay_order_id: response.razorpay_order_id,
                       razorpay_payment_id: response.razorpay_payment_id,
                       razorpay_signature: response.razorpay_signature,
                       dbOrderId: data.dbOrderId
                   }, {
                       headers: { Authorization: `Bearer ${token}` }
                   });

                   if (verify.data.success) {
                       clearCart();
                       navigate('/order/success');
                   }
               } catch (verificationError) {
                   setError("Payment signature verification failed. The transaction was rejected by the server.");
               }
           },
           prefill: {
               name: shipping.name,
               contact: shipping.phone
           },
           theme: {
               color: "#3B82F6" // Standard blue glow to match UI
           }
       };

       // 4. Instantiate and launch the actual Razorpay Popup Modal
       const rzp = new (window as any).Razorpay(options);
       rzp.on('payment.failed', function (response: any) {
           setError(`Mock Payment Failed: ${response.error.description}`);
       });
       rzp.open();

    } catch (err) {
       console.error("Failed to spin up payment terminal", err);
       setError("The payment gateway failed to initialize. Please try again.");
    } finally {
       setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-3xl font-black text-[var(--color-text)] mb-4">Your Requisition is Empty</h2>
        <p className="text-[var(--color-muted-on-dark)] mb-8">Return to the catalog to authorize products for procurement.</p>
        <button onClick={() => navigate(-1)} className="px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-bold tracking-wide hover:brightness-110 transition-all">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[color:var(--color-background)] py-32 px-6 relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Universal Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-border-soft)] mb-8 pb-4">
            <h1 className="text-4xl font-black text-[var(--color-text)] tracking-tight">
              {checkoutStep === 1 ? 'Logistics Details' : 'Secure Procurement'}
            </h1>
            <div className="text-[var(--color-muted-on-dark)] font-bold tracking-widest uppercase text-sm mt-2 md:mt-0">
               STEP {checkoutStep} OF 2
            </div>
        </div>
        
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-medium animate-pulse">
            {error}
          </div>
        )}

        {/* STEP 1: SHIPPING FORM */}
        {checkoutStep === 1 && (
          <div className="bg-[var(--color-surface)]/60 border border-[var(--color-border-soft)] p-8 rounded-3xl shadow-xl max-w-2xl mx-auto">
             <form onSubmit={handleContinueToReview} className="space-y-6">
                 
                 <div className="space-y-2">
                     <label className="text-xs font-semibold tracking-wide text-[var(--color-muted-on-dark)] uppercase">Receiving Identity</label>
                     <input 
                       type="text" 
                       required
                       value={shipping.name}
                       onChange={e => setShipping({...shipping, name: e.target.value})}
                       className="w-full bg-[var(--color-background)]/50 border border-[var(--color-border-soft)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                     />
                 </div>

                 <div className="space-y-2">
                     <label className="text-xs font-semibold tracking-wide text-[var(--color-muted-on-dark)] uppercase">Secure Comms (Phone)</label>
                     <input 
                       type="tel" 
                       required
                       value={shipping.phone}
                       onChange={e => setShipping({...shipping, phone: e.target.value})}
                       className="w-full bg-[var(--color-background)]/50 border border-[var(--color-border-soft)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                     />
                 </div>

                 <div className="space-y-2">
                     <label className="text-xs font-semibold tracking-wide text-[var(--color-muted-on-dark)] uppercase">Delivery Coordinates</label>
                     <textarea 
                       required
                       rows={3}
                       value={shipping.address}
                       onChange={e => setShipping({...shipping, address: e.target.value})}
                       className="w-full bg-[var(--color-background)]/50 border border-[var(--color-border-soft)] rounded-xl px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                     />
                 </div>

                 <div className="flex items-center gap-3 pt-2 pb-4">
                     <input 
                       type="checkbox" 
                       id="saveProfile" 
                       checked={saveToProfile}
                       onChange={e => setSaveToProfile(e.target.checked)}
                       className="w-5 h-5 accent-[var(--color-primary)] cursor-pointer"
                     />
                     <label htmlFor="saveProfile" className="text-sm font-medium text-[var(--color-text)]/80 cursor-pointer select-none">
                        Synchronize delivery details to permanent profile
                     </label>
                 </div>

                 <button 
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-black tracking-widest uppercase text-sm hover:scale-[1.02] shadow-lg transition-all"
                 >
                    Continue to Verification
                 </button>
             </form>
          </div>
        )}

        {/* STEP 2: REVIEW & PAYMENT */}
        {checkoutStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              
              {/* Shipping Review Badge */}
              <div className="bg-[var(--color-surface)]/80 border border-[var(--color-border-soft)] p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h3 className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-widest mb-1">Destination Address</h3>
                    <p className="text-[var(--color-text)] font-semibold">{shipping.name} • {shipping.phone}</p>
                    <p className="text-[var(--color-muted-on-dark)] text-sm mt-1 max-w-sm line-clamp-2">{shipping.address}</p>
                 </div>
                 <button 
                   onClick={() => setCheckoutStep(1)}
                   className="text-sm font-bold border border-[var(--color-border-soft)] px-4 py-2 rounded-full hover:bg-[var(--color-surface-soft)] transition-colors text-[var(--color-text)] whitespace-nowrap"
                 >
                    Modify
                 </button>
              </div>

              <h2 className="text-xl font-bold text-[var(--color-text)] mb-4 pt-4">Requisition Details</h2>
              
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-4 md:gap-6 items-center p-4 rounded-2xl bg-[color:var(--color-surface)]/60 border border-[color:var(--color-border-soft)] relative pr-12">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shadow-md shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--color-text)] text-sm md:text-lg mb-2 truncate">{item.title}</h3>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="text-[var(--color-text)] font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] text-[var(--color-text)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-lg md:text-xl font-black text-[var(--color-primary)] shrink-0">
                    ₹{item.price * item.quantity}
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.productId)}
                    className="absolute right-4 top-4 md:static md:ml-4 text-[var(--color-muted-on-dark)] hover:text-red-500 transition-colors"
                    title="Remove from cart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-[linear-gradient(145deg,var(--color-card-a)_0%,var(--color-card-b)_55%,var(--color-card-c)_100%)] p-6 rounded-3xl border border-[color:var(--color-border-soft)] shadow-2xl h-fit">
              <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Financial Summary</h2>
              
              <div className="space-y-4 text-sm mb-6 pb-6 border-b border-[var(--color-border-soft)]">
                <div className="flex justify-between text-[var(--color-muted-on-dark)]">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-[var(--color-muted-on-dark)]">
                  <span>Ecological Tax</span>
                  <span>₹0</span>
                </div>
              </div>

              <div className="flex justify-between font-black text-2xl text-[var(--color-text)] mb-8">
                <span>Total Capital</span>
                <span className="text-[var(--color-primary)]">₹{totalPrice}</span>
              </div>

              <button 
                onClick={handlePayment}
                disabled={loading}
                className="w-full py-4 rounded-xl bg-[color:var(--color-chip)] text-[var(--color-bg-strong)] font-black tracking-widest uppercase text-sm hover:scale-[1.02] shadow-[0_0_20px_var(--color-glow)] transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
              >
                {loading ? 'Initiating...' : 'Authorize Transaction'}
              </button>
              <p className="text-xs text-center text-[var(--color-muted-on-dark)] mt-4 font-light opacity-80 gap-1 flex items-center justify-center">
                Secured rapidly via Private Network
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
