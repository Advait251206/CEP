import type { ReactNode } from 'react';
import AnimatedText from '../ui/AnimatedText';

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  variant?: 'dark' | 'light';
}

export default function ContentSection({ title, subtitle, children, className = '', variant = 'dark' }: ContentSectionProps) {
  const isDark = variant === 'dark';
  const sectionBgClass = isDark
    ? 'bg-gradient-to-b from-[color:var(--color-surface)]/60 to-[color:var(--color-background)] text-[var(--color-text)]'
    : 'bg-[var(--color-background)] text-[var(--color-text)]';
  const cardBgClass = isDark
    ? 'border border-[color:var(--color-border-soft)] bg-[linear-gradient(130deg,var(--color-card-a)_0%,var(--color-card-b)_45%,var(--color-card-c)_100%)]'
    : 'border border-[color:var(--color-border-soft)] bg-[linear-gradient(130deg,var(--color-card-a)_0%,var(--color-card-b)_52%,var(--color-card-c)_100%)]';
  
  return (
    <section className={`py-28 md:py-36 px-6 md:px-8 w-full ${sectionBgClass} ${className} relative overflow-hidden`}>
      {/* Subtle organic decorative elements */}
      {isDark && (
        <div className="pointer-events-none absolute -left-64 top-1/4 h-96 w-96 rounded-full bg-[var(--color-glow)] blur-[100px]" />
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedText>
          {subtitle && (
            <span className="mb-4 block text-sm font-bold uppercase tracking-widest text-[var(--color-accent)]">
              {subtitle}
            </span>
          )}
          <h2 className="mb-14 text-5xl font-extrabold tracking-tight text-[var(--color-text)] md:text-6xl">
            {title}
          </h2>
        </AnimatedText>

        <AnimatedText delay={0.2} className={`relative rounded-3xl p-10 md:p-14 backdrop-blur-xl ${cardBgClass} shadow-[0_22px_55px_-26px_var(--color-primary)]`}>
          <div className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_top_right,var(--color-glow),transparent_52%)]" />
          <div className="prose max-w-none prose-emerald dark:prose-invert leading-relaxed space-y-6 [&_p]:text-[0.9rem] md:[&_p]:text-[1.2rem] [&_li]:text-[0.85rem] md:[&_li]:text-[1.15rem]">
            {children}
          </div>
        </AnimatedText>
      </div>
    </section>
  );
}
