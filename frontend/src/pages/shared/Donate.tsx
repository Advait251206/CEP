import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { FadeIn } from '../../components/FadeIn';
import api from '../../services/api';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Donate = () => {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [amount, setAmount] = useState<number>(500);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async () => {
    if (!user) {
      setMessage('Please login to donate.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

      if (!res) {
        setMessage('Failed to load Razorpay SDK. Please check your internet connection.');
        setLoading(false);
        return;
      }

      // 1. Create order on backend
      const { data: orderData } = await api.post('/payment/create-order', {
        items: [],
        totalAmount: amount,
      });

      // 2. Open Razorpay Checktout via widget
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Govigyan & Anandwan',
        description: 'Support Our Cause',
        order_id: orderData.orderId,
        handler: async function (response: any) {
          try {
            // 3. Verify payment on backend
            await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              dbOrderId: orderData.dbOrderId,
            });
            setMessage('Donation successful! Thank you for your support.');
          } catch (error) {
            setMessage('Payment verification failed.');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: theme === 'anandwan' ? '#8b5a2b' : '#2e8b57',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      setMessage('Something went wrong initiating the donation.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
      <FadeIn>
        <h1 className="text-5xl font-bold mb-6 text-center text-[var(--color-primary)]">
          Support Our Cause
        </h1>
        <p className="text-xl mb-12 text-center opacity-80 max-w-2xl">
          Your contribution helps us continue our mission of empowerment and environmental sustainability.
          Every effort matters.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="relative w-full max-w-md rounded-2xl border border-[color:var(--color-border-soft)] bg-[linear-gradient(145deg,var(--color-card-a)_0%,var(--color-card-b)_55%,var(--color-card-c)_100%)] p-8 shadow-[0_20px_42px_-22px_var(--color-primary)]">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_right,var(--color-glow),transparent_58%)]" />
        <div className="pointer-events-none absolute left-6 top-6 h-1.5 w-16 rounded-full bg-[var(--color-chip)]/90" />
        <label className="block text-lg font-medium mb-4">Select or Enter Amount (INR)</label>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[500, 1000, 5000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className={`py-2 rounded-lg font-bold transition-all ${
                amount === val 
                  ? 'scale-105 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-md' 
                  : 'bg-white text-[var(--color-text)]/75 hover:bg-[color:var(--color-surface-soft)]'
              }`}
            >
              ₹{val}
            </button>
          ))}
        </div>

        <input
          type="number"
          min="1"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          placeholder="Custom Amount"
          className="mb-8 w-full rounded-lg border border-[color:var(--color-border-soft)] bg-white px-4 py-3 text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/30"
        />

        <button
          onClick={handleDonate}
          disabled={loading}
          className="w-full rounded-lg bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-4 text-xl font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          {loading ? 'Processing...' : `Donate ₹${amount}`}
        </button>

        {message && (
          <p className="mt-6 text-center font-medium text-lg" style={{ color: message.includes('success') ? 'var(--color-secondary)' : 'red' }}>
            {message}
          </p>
        )}
      </FadeIn>
    </div>
  );
};

export default Donate;
