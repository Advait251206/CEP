import { useState } from 'react';
import { motion } from 'framer-motion';

import AnimatedText from '../ui/AnimatedText';

interface ImageTextSectionProps {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  imageUrl: string;
  imagePosition?: 'left' | 'right';
}

export default function ImageTextSection({ 
  title, 
  subtitle, 
  content, 
  imageUrl, 
  imagePosition = 'left' 
}: ImageTextSectionProps) {
  const [imgError, setImgError] = useState(false);
  
  return (
    <section className="overflow-hidden border-t border-[color:var(--color-border-soft)] bg-gradient-to-b from-[color:var(--color-surface)]/55 to-[color:var(--color-background)] py-28 md:py-36">
      <div className={`max-w-[1600px] mx-auto px-6 md:px-8 flex flex-col gap-12 md:gap-16 items-center md:items-stretch ${
        imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}>
        
        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, x: imagePosition === 'left' ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col"
        >
          <div className="relative w-full h-[400px] md:h-full overflow-hidden rounded-3xl border border-[color:var(--color-border-soft)] shadow-[0_16px_50px_-28px_var(--color-primary)]">
            {/* Dark gradient overlay at bottom for depth */}
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-[color:var(--color-bg-strong)]/25 via-transparent to-transparent opacity-80" />
            
            {!imgError ? (
              <img 
                src={imageUrl} 
                alt={title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[color:var(--color-surface)]">
                <span className="max-w-[80vw] break-all text-center text-sm uppercase tracking-widest text-[var(--color-muted-on-dark)]">
                  Image Reference:<br />{imageUrl}
                </span>
              </div>
            )}
            
            {/* Elegant border overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 rounded-3xl border-2 border-[var(--color-accent)]/25" />
          </div>
        </motion.div>

        {/* Text Side */}
        <div className="relative w-full md:w-1/2 flex flex-col justify-center rounded-3xl border border-[color:var(--color-border-soft)] bg-[linear-gradient(145deg,var(--color-card-a)_0%,var(--color-card-b)_55%,var(--color-card-c)_100%)] p-8 md:p-10 shadow-[0_18px_45px_-24px_var(--color-primary)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,var(--color-glow),transparent_56%)]" />
          <AnimatedText>
            {subtitle && (
              <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">
                {subtitle}
              </span>
            )}
            <h2 className="mb-10 text-5xl font-bold leading-tight tracking-tight text-[var(--color-text)] md:text-6xl">
              {title}
            </h2>
          </AnimatedText>
          
          <AnimatedText delay={0.2}>
            <div className="prose relative max-w-none leading-relaxed font-light text-[var(--color-text)]/88 space-y-6 [&_p]:text-[0.9rem] md:[&_p]:text-[1.2rem] [&_li]:text-[0.85rem] md:[&_li]:text-[1.15rem]">
              {content}
            </div>
          </AnimatedText>
        </div>

      </div>
    </section>
  );
}
