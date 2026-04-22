import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeleteConfirmModalProps {
    isOpen: boolean;
    productName: string;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, productName, onClose, onConfirm }: DeleteConfirmModalProps) {
    const [inputValue, setInputValue] = useState('');
    const expectedString = `Delete ${productName}`;
    const isValid = inputValue === expectedString;

    // Reset input when modal opens/closes
    if (!isOpen && inputValue !== '') {
        setInputValue('');
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-[var(--color-surface)] border border-red-500/30 rounded-2xl shadow-[0_0_50px_-15px_red] p-6 lg:p-8"
                    >
                        <h2 className="text-2xl font-black text-white mb-2 tracking-tight">Destructive Action</h2>
                        <p className="text-[var(--color-text)]/70 mb-6 text-sm lg:text-base">
                            This action cannot be undone. This will permanently delete the <span className="font-bold text-white">{productName}</span> product and remove all associations.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold tracking-wide text-[var(--color-text)]/60 uppercase mb-2">
                                    Please type <span className="text-red-400 font-mono bg-red-400/10 px-1 py-0.5 rounded select-all">{expectedString}</span> to confirm
                                </label>
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={expectedString}
                                    className="w-full bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-lg px-4 py-3 text-[var(--color-text)] focus:outline-none focus:border-red-500 transition-colors font-mono"
                                />
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-4 py-3 rounded-xl bg-[var(--color-surface-soft)] hover:bg-[var(--color-border-soft)] text-white font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={!isValid}
                                    onClick={() => {
                                        if (isValid) onConfirm();
                                    }}
                                    className="flex-1 px-4 py-3 rounded-xl bg-red-500 text-white font-black hover:brightness-110 shadow-[0_4px_15px_0_rgba(239,68,68,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    Delete Instantly
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
