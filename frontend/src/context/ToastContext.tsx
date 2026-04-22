import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3 pointer-events-none w-full max-w-sm px-4">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] border backdrop-blur-md ${
                                toast.type === 'success' ? 'bg-[#0a4023]/80 border-green-500/30 text-white' :
                                toast.type === 'error' ? 'bg-[#400a0a]/80 border-red-500/30 text-white' :
                                'bg-[#1a1a1f]/80 border-[var(--color-border-soft)] text-[var(--color-text)]'
                            }`}
                        >
                             <div className="flex items-center gap-3">
                                 {toast.type === 'success' && <span className="text-green-500 text-xl font-bold">✓</span>}
                                 {toast.type === 'error' && <span className="text-red-500 text-xl font-bold">✕</span>}
                                 {toast.type === 'info' && <span className="text-blue-500 text-xl font-bold">ℹ</span>}
                                 <span className="font-semibold text-sm tracking-wide">{toast.message}</span>
                             </div>
                             <button onClick={() => removeToast(toast.id)} className="text-white/50 hover:text-white transition-colors p-1">
                                 ✕
                             </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
