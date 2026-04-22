import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface ScrollySectionProps {
  children: ReactNode;
  className?: string;
  themeSync?: boolean; // Whether true 100vh snapping happens
  style?: React.CSSProperties;
}

export const ScrollySection = ({ children, className = '', themeSync = false, style }: ScrollySectionProps) => {
  const { animationsEnabled } = useTheme();

  return (
    <motion.section
      initial={animationsEnabled ? { opacity: 0, y: 50 } : {}}
      whileInView={animationsEnabled ? { opacity: 1, y: 0 } : {}}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={`relative min-h-[100vh] w-full flex flex-col justify-center snap-start ${className} ${themeSync ? 'overflow-hidden' : ''}`}
      style={style}
    >
      {children}
    </motion.section>
  );
};
