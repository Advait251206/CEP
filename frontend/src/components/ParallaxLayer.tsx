import { type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const ParallaxLayer = ({ 
  children, 
  offset = 50, 
  className = '' 
}: { 
  children: ReactNode; 
  offset?: number;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
