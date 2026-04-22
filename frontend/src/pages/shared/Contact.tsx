import { FadeIn } from '../../components/FadeIn';

const Contact = () => {
  return (
    <div className="min-h-screen py-32 px-6 max-w-4xl mx-auto">
      <FadeIn className="text-center mb-16">
        <h1 className="text-6xl font-black text-[var(--color-primary)] mb-6">Contact Us</h1>
        <p className="text-2xl opacity-80 text-[var(--color-text)]">
          We would love to hear from you. Reach out for collaborations, bulk orders, or general inquiries.
        </p>
      </FadeIn>

      <FadeIn delay={0.2} className="relative rounded-[3rem] border border-[color:var(--color-border-soft)] bg-[linear-gradient(145deg,var(--color-card-a)_0%,var(--color-card-b)_55%,var(--color-card-c)_100%)] p-12 shadow-[0_22px_45px_-24px_var(--color-primary)]">
        <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-[radial-gradient(circle_at_top_right,var(--color-glow),transparent_60%)]" />
        <div className="pointer-events-none absolute left-10 top-8 h-1.5 w-20 rounded-full bg-[var(--color-chip)]/90" />
        <form className="flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[var(--color-primary)]">First Name</label>
              <input type="text" className="rounded-xl border border-[color:var(--color-border-soft)] bg-white px-6 py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" placeholder="Jane" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[var(--color-primary)]">Last Name</label>
              <input type="text" className="rounded-xl border border-[color:var(--color-border-soft)] bg-white px-6 py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" placeholder="Doe" />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[var(--color-primary)]">Email Address</label>
            <input type="email" className="rounded-xl border border-[color:var(--color-border-soft)] bg-white px-6 py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" placeholder="jane@example.com" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-bold text-[var(--color-primary)]">Your Message</label>
            <textarea rows={6} className="resize-none rounded-xl border border-[color:var(--color-border-soft)] bg-white px-6 py-4 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-primary)]" placeholder="How can we help?"></textarea>
          </div>

          <button type="button" className="mt-4 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] py-5 text-xl font-bold text-white shadow-md transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'var(--color-primary)' }}>
            Send Message
          </button>
        </form>
      </FadeIn>
    </div>
  );
};

export default Contact;
