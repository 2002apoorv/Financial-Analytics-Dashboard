import { motion } from 'framer-motion';

const easeOut = { duration: 1.2, ease: [0.16, 1, 0.3, 1] };

export default function HeroSection() {
  return (
    <section
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
      style={{ background: '#050505' }}
      aria-label="MarketPulse Hero"
    >
      {/* Ambient radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(16,185,129,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Logo / Brand mark */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...easeOut, delay: 0.2 }}
        className="mb-8 flex items-center gap-3"
      >
        {/* Pulse icon */}
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 rounded-full bg-emerald-500 opacity-20 animate-ping" style={{ animationDuration: '2.4s' }} />
          <div className="relative w-8 h-8 rounded-full border border-emerald-500/40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>
        <span className="text-white/40 text-sm font-medium tracking-[0.25em] uppercase">
          MarketPulse
        </span>
      </motion.div>

      {/* Main headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...easeOut, delay: 0.4 }}
        className="text-center font-inter font-black tracking-tight leading-[0.92]"
        style={{
          fontSize: 'clamp(3.5rem, 10vw, 9rem)',
          color: 'rgba(255,255,255,0.92)',
          letterSpacing: '-0.03em',
        }}
      >
        Market
        <br />
        <span
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 50%, #6ee7b7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Pulse
        </span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...easeOut, delay: 0.6 }}
        className="mt-6 text-center font-inter font-light"
        style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(255,255,255,0.4)',
          letterSpacing: '0.04em',
          maxWidth: '480px',
        }}
      >
        Where Momentum Meets Precision
      </motion.p>

      {/* Divider line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ ...easeOut, delay: 0.8 }}
        className="mt-10 w-px h-16 mx-auto"
        style={{ background: 'linear-gradient(to bottom, rgba(16,185,129,0.5), transparent)' }}
      />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-4 flex flex-col items-center gap-2"
        aria-label="Scroll to explore"
      >
        <span
          className="text-white/25 font-inter tracking-[0.3em] uppercase"
          style={{ fontSize: '0.625rem' }}
        >
          Scroll to Explore
        </span>
        {/* Animated chevron */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true">
            <path
              d="M1 1L7 7L13 1"
              stroke="rgba(16,185,129,0.5)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Bottom horizontal rule */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }}
      />
    </section>
  );
}
