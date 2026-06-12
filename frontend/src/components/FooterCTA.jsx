import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function FooterCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const navigate = useNavigate();

  return (
    <footer
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden py-36 px-6"
      style={{ background: '#050505', minHeight: '70vh' }}
      aria-labelledby="cta-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 70%, rgba(16,185,129,0.09) 0%, transparent 60%)',
        }}
      />

      {/* Top separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-inter font-medium mb-6"
          style={{ fontSize: '0.7rem', color: 'rgba(16,185,129,0.65)', letterSpacing: '0.24em', textTransform: 'uppercase' }}
        >
          Begin Your Journey
        </motion.p>

        {/* Headline */}
        <motion.h2
          id="cta-heading"
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-inter font-black tracking-tight"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            color: 'rgba(255,255,255,0.92)',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
          }}
        >
          Trade
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #34d399 60%, #6ee7b7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Smarter.
          </span>
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-inter font-light"
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.02em',
            maxWidth: '400px',
          }}
        >
          Join thousands of traders who already see the market differently.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA */}
          <motion.button
            id="cta-get-started"
            onClick={() => navigate('/signup')}
            className="relative group font-inter font-semibold px-10 py-4 rounded-full overflow-hidden"
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.03em',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              boxShadow: '0 0 40px rgba(16,185,129,0.3), 0 4px 20px rgba(0,0,0,0.4)',
            }}
            whileHover={{ scale: 1.04, boxShadow: '0 0 60px rgba(16,185,129,0.45), 0 8px 30px rgba(0,0,0,0.5)' }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            aria-label="Get started with MarketPulse"
          >
            {/* Shimmer overlay */}
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)',
                transition: 'opacity 0.3s',
              }}
            />
            Get Started
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            id="cta-launch-app"
            onClick={() => navigate('/app')}
            className="font-inter font-medium px-10 py-4 rounded-full"
            style={{
              fontSize: '0.9rem',
              letterSpacing: '0.03em',
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.03)',
            }}
            whileHover={{
              color: 'rgba(255,255,255,0.85)',
              borderColor: 'rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.06)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
            aria-label="Launch the trading dashboard"
          >
            Launch Dashboard →
          </motion.button>
        </motion.div>

        {/* Trust badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex items-center gap-2"
        >
          <div className="flex -space-x-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border border-black/50"
                style={{
                  background: `hsl(${i * 40 + 140}, 40%, 40%)`,
                  zIndex: 5 - i,
                }}
              />
            ))}
          </div>
          <p className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            10,000+ active traders
          </p>
        </motion.div>
      </div>

      {/* Bottom credits */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-8 inset-x-0 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 px-6"
      >
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
          <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.18)', letterSpacing: '0.08em' }}>
            © 2025 MarketPulse
          </span>
        </div>
        <span className="font-inter text-xs" style={{ color: 'rgba(255,255,255,0.12)', letterSpacing: '0.06em' }}>
          For educational purposes only. Not financial advice.
        </span>
      </motion.div>
    </footer>
  );
}
