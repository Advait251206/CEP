import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[color:var(--color-background)] py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[color:var(--color-glow)] via-[color:var(--color-background)]/80 to-[color:var(--color-background)] opacity-50 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-2xl relative z-10 backdrop-blur-xl bg-[color:var(--color-surface)]/60 border border-[color:var(--color-border-soft)] p-12 rounded-3xl shadow-[0_20px_60px_-15px_var(--color-primary)] text-center"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[var(--color-accent)]/30 to-transparent rounded-[1.5rem] blur opacity-40 -z-10" />

        <div className="mx-auto w-24 h-24 rounded-full bg-[color:var(--color-chip)] flex items-center justify-center mb-8 shadow-[0_0_30px_var(--color-glow)]">
          <svg className="w-12 h-12 text-[var(--color-bg-strong)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-[var(--color-text)] tracking-tight mb-4">
          Capital Deployed
        </h1>
        <p className="text-lg text-[var(--color-muted-on-dark)] leading-relaxed mb-10 font-light">
          Your transaction was aggressively processed and authenticated. This capital will be utilized immediately to structurally fortify massive ecological healing protocols across our network. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/anandwan/shop" 
            className="py-4 px-8 rounded-xl bg-[color:var(--color-chip)] text-[var(--color-bg-strong)] font-black tracking-widest uppercase text-sm hover:scale-[1.02] shadow-[0_0_20px_var(--color-glow)] transition-all duration-300"
          >
            Procure More
          </Link>
          <Link 
            to="/govigyan/home" 
            className="py-4 px-8 rounded-xl bg-transparent border border-[color:var(--color-border-soft)] text-[var(--color-text)] font-black tracking-widest uppercase text-sm hover:bg-[color:var(--color-surface-soft)] transition-all duration-300 hover:border-[var(--color-accent)]"
          >
            Return to Core
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
