import { useState } from 'react';
import { motion } from 'framer-motion';

import AnimatedText from '../ui/AnimatedText';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export default function HeroSection({ title, subtitle, imageUrl }: HeroSectionProps) {

  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative flex h-[100vh] w-full items-center justify-center overflow-hidden bg-[var(--color-bg-strong)]">
      {/* Background Image with Fallback */}
      <motion.div className="absolute inset-0 z-0">
        {!imgError ? (
          <img 
            src={imageUrl} 
            alt={title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg-strong)]">
            <span className="max-w-[80vw] break-all text-center text-sm uppercase tracking-widest text-[var(--color-muted-on-dark)]">
              Image Reference:<br />{imageUrl}
            </span>
          </div>
        )}
      </motion.div>

      {/* Dark gradient overlay for typography contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[color:var(--color-bg-strong)]/20 via-[color:var(--color-bg-strong)]/45 to-[color:var(--color-bg-strong)]/95" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto mt-20">
        <AnimatedText delay={0.2}>
          <h1 className="mb-6 text-6xl font-black leading-[1.1] tracking-tight text-[var(--color-ink-on-dark)] md:text-8xl">
            {title}
          </h1>
        </AnimatedText>
        <AnimatedText delay={0.4}>
          <p className="mx-auto max-w-3xl text-lg font-light leading-relaxed text-[var(--color-muted-on-dark)] md:text-2xl">
            {subtitle}
          </p>
        </AnimatedText>
      </div>

      {/* Scroll indicator overlay */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[var(--color-muted-on-dark)]/70 md:flex"
      >
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll to Discover</span>
        <div className="h-12 w-[1px] bg-gradient-to-b from-[var(--color-muted-on-dark)]/70 to-transparent" />
      </motion.div>
    </section>
  );
}
