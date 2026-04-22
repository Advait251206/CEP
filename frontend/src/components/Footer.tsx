import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  const isGovigyan = theme === 'govigyan';
  const siteName = isGovigyan ? 'Govigyan' : 'Anandwan';
  const siteTagline = isGovigyan
    ? 'Regenerative agriculture, indigenous science, and ecological resilience.'
    : 'Human dignity, disability empowerment, and community-led sustainability.';

  const primaryLinks = isGovigyan
    ? [
        { label: 'Home', to: '/govigyan/home' },
        { label: 'Our Soil', to: '/govigyan/about' },
        { label: 'Agriculture', to: '/govigyan/agriculture' },
        { label: 'Livestock', to: '/govigyan/livestock' },
      ]
    : [
        { label: 'Home', to: '/anandwan/home' },
        { label: 'About', to: '/anandwan/about' },
        { label: 'Impact', to: '/anandwan/impact' },
        { label: 'Gallery', to: '/anandwan/gallery' },
      ];

  return (
    <footer className="relative border-t border-[color:var(--color-border-soft)] bg-gradient-to-b from-[color:var(--color-surface)]/65 via-[color:var(--color-surface)]/45 to-[color:var(--color-background)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent)]/70 to-transparent" />
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-10 px-8 py-12 md:px-12 md:py-14">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div>
            <p className="text-2xl font-bold tracking-wide text-[var(--color-text)]">
              {siteName} Platform
            </p>
            <p className="mt-3 max-w-xl text-base md:text-lg leading-relaxed text-[var(--color-text)]/75">
              {siteTagline}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={isGovigyan ? '/govigyan/shop' : '/anandwan/shop'}
                className="rounded-full border border-[color:var(--color-border-soft)] bg-[color:var(--color-background)]/80 px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[var(--color-text)] transition-all hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
              >
                Visit Shop
              </Link>
            </div>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/65">Quick Links</p>
            <nav className="grid grid-cols-2 gap-x-8 gap-y-3 text-base text-[var(--color-text)]">
              {primaryLinks.map((link) => (
                <Link key={link.to} className="transition-colors hover:text-[var(--color-accent)]" to={link.to}>
                  {link.label}
                </Link>
              ))}
              <Link
                className="transition-colors hover:text-[var(--color-accent)]"
                to={isGovigyan ? '/govigyan/shop' : '/anandwan/shop'}
              >
                Shop
              </Link>
              <Link
                className="transition-colors hover:text-[var(--color-accent)]"
                to={isGovigyan ? '/govigyan/contact' : '/anandwan/contact'}
              >
                Contact
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-widest text-[var(--color-text)]/65">Connect With Us</p>
            <nav className="grid gap-3 text-base text-[var(--color-text)]">
              <a href="#" className="transition-colors hover:text-[var(--color-accent)] flex items-center gap-2">
                 <span>Instagram</span>
              </a>
              <a href="#" className="transition-colors hover:text-[var(--color-accent)] flex items-center gap-2">
                 <span>YouTube</span>
              </a>
              <a href="#" className="transition-colors hover:text-[var(--color-accent)] flex items-center gap-2">
                 <span>LinkedIn</span>
              </a>
              <Link className="transition-colors hover:text-[var(--color-accent)] mt-2 opacity-70 hover:opacity-100" to="#">
                 Privacy Policy
              </Link>
              <Link className="transition-colors hover:text-[var(--color-accent)] opacity-70 hover:opacity-100" to="#">
                 Terms of Service
              </Link>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[color:var(--color-border-soft)] pt-5 text-sm text-[var(--color-text)]/70 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteName}. Built for storytelling and social impact.</p>
          <p>Crafted with React, Tailwind, Framer Motion, and purpose.</p>
        </div>
      </div>
    </footer>
  );
}
