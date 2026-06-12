import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const INSIGHTS = [
  {
    id: 'real-time',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M3 12h2l3-9 4 18 3-12 2 3h4" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: 'Real-Time Analytics',
    headline: 'Markets rendered\nat millisecond precision.',
    body:
      'Sub-10ms data pipelines deliver institutional-grade tick data, volume imbalances, and order flow directly to your dashboard.',
    stat: '< 10ms',
    statLabel: 'data latency',
  },
  {
    id: 'ai-signals',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="#10b981" strokeWidth="1.5"/>
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    label: 'AI-Powered Signals',
    headline: 'Intelligence that\nanticipates the move.',
    body:
      'Transformer-based models trained on decades of multi-asset price action surface high-conviction entry and exit signals before momentum peaks.',
    stat: '94.2%',
    statLabel: 'signal accuracy',
  },
  {
    id: 'institutional',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="10" width="4" height="11" rx="1" stroke="#10b981" strokeWidth="1.5"/>
        <rect x="10" y="6" width="4" height="15" rx="1" stroke="#10b981" strokeWidth="1.5"/>
        <rect x="17" y="3" width="4" height="18" rx="1" stroke="#10b981" strokeWidth="1.5"/>
      </svg>
    ),
    label: 'Institutional Grade',
    headline: 'The edge once reserved\nfor the few.',
    body:
      'Access dark pool flow, gamma exposure levels, and options market maker positioning — the data that moves markets before retail sees it.',
    stat: '$2.4T',
    statLabel: 'daily volume tracked',
  },
];

function InsightCard({ insight, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.article
      ref={ref}
      id={`insight-${insight.id}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative group flex flex-col gap-6 p-8 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        transition: 'border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
      }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        {/* Icon badge */}
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}
        >
          {insight.icon}
        </div>

        {/* Stat */}
        <div className="text-right">
          <p
            className="font-inter font-bold tabular-nums"
            style={{ fontSize: '1.5rem', color: '#10b981', letterSpacing: '-0.02em', lineHeight: 1 }}
          >
            {insight.stat}
          </p>
          <p className="font-inter text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
            {insight.statLabel}
          </p>
        </div>
      </div>

      {/* Label */}
      <p
        className="font-inter font-medium"
        style={{ fontSize: '0.7rem', color: 'rgba(16,185,129,0.7)', letterSpacing: '0.18em', textTransform: 'uppercase' }}
      >
        {insight.label}
      </p>

      {/* Headline */}
      <h3
        className="font-inter font-bold leading-tight"
        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)', color: 'rgba(255,255,255,0.88)', letterSpacing: '-0.025em', whiteSpace: 'pre-line' }}
      >
        {insight.headline}
      </h3>

      {/* Body */}
      <p
        className="font-inter font-light leading-relaxed"
        style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.4)' }}
      >
        {insight.body}
      </p>

      {/* Hover glow overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(16,185,129,0.06) 0%, transparent 60%)',
          transition: 'opacity 0.4s',
        }}
      />
    </motion.article>
  );
}

export default function InsightsSection() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      className="relative py-32 px-6"
      style={{ background: '#050505' }}
      aria-labelledby="insights-heading"
    >
      {/* Top separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div ref={headerRef} className="mb-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-inter font-medium mb-4"
            style={{ fontSize: '0.7rem', color: 'rgba(16,185,129,0.7)', letterSpacing: '0.22em', textTransform: 'uppercase' }}
          >
            Platform Capabilities
          </motion.p>
          <motion.h2
            id="insights-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter font-black tracking-tight"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 5rem)',
              color: 'rgba(255,255,255,0.92)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}
          >
            Built for those
            <br />
            <span style={{ color: 'rgba(255,255,255,0.35)' }}>who trade differently.</span>
          </motion.h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {INSIGHTS.map((insight, i) => (
            <InsightCard key={insight.id} insight={insight} index={i} />
          ))}
        </div>

        {/* Bottom feature strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { label: 'Monte Carlo', sub: 'Risk Simulation' },
            { label: 'Black-Scholes', sub: 'Options Pricing' },
            { label: 'GARCH', sub: 'Volatility Modeling' },
            { label: 'Multi-Asset', sub: 'Portfolio Analytics' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center py-5 px-4 rounded-xl text-center"
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <p className="font-inter font-semibold" style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', letterSpacing: '-0.01em' }}>
                {item.label}
              </p>
              <p className="font-inter mt-1" style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.06em' }}>
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom separator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06), transparent)' }}
      />
    </section>
  );
}
