import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { useImageSequence, TOTAL_FRAMES } from '../hooks/useImageSequence';

const OVERLAYS = [
  { text: 'Markets Move Fast',            from: 0.0,  to: 0.18, sub: null },
  { text: 'Bull vs Bear',                 from: 0.15, to: 0.35, sub: 'The eternal market struggle' },
  { text: 'Momentum Changes Everything',  from: 0.32, to: 0.52, sub: null },
  { text: 'Trade the Trend',              from: 0.50, to: 0.70, sub: 'Follow the signal, not the noise' },
  { text: 'MarketPulse',                  from: 0.70, to: 1.0,  sub: 'Where Momentum Meets Precision' },
];

function ParallaxOverlay({ text, sub, progress, from, to }) {
  const fadeIn    = useTransform(progress, [from, Math.min(from + 0.08, to)], [0, 1]);
  const fadeOut   = useTransform(progress, [Math.max(to - 0.08, from), to], [1, 0]);
  const translateY = useTransform(progress, [from, to], [28, -28]);
  const springY   = useSpring(translateY, { stiffness: 55, damping: 18 });

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-end pointer-events-none"
      style={{ paddingBottom: '10vh', opacity: fadeIn }}
      aria-hidden="true"
    >
      <motion.div style={{ opacity: fadeOut, y: springY }} className="flex flex-col items-center gap-3">
        <div style={{ width: 32, height: 1, background: 'rgba(16,185,129,0.6)' }} />
        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(1.75rem, 5vw, 4.5rem)',
            color: 'rgba(255,255,255,0.88)',
            letterSpacing: '-0.02em',
            textShadow: '0 2px 40px rgba(0,0,0,0.9)',
            maxWidth: 700,
            textAlign: 'center',
            margin: 0,
          }}
        >
          {text}
        </p>
        {sub && (
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.75rem, 1.5vw, 1rem)',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.08em',
              textShadow: '0 2px 20px rgba(0,0,0,0.6)',
              textAlign: 'center',
              margin: 0,
            }}
          >
            {sub}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}

function LoadingOverlay({ progress }) {
  if (progress >= 1) return null;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#050505',
        zIndex: 10,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <div style={{ position: 'relative', width: 48, height: 48 }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'rgba(16,185,129,0.2)',
              animation: 'ping 1.5s ease-in-out infinite',
            }}
          />
          <div
            style={{
              position: 'relative',
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '1px solid rgba(16,185,129,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#34d399' }} />
          </div>
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
          Loading sequence...
        </p>
        <div style={{ width: 192, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${Math.round(progress * 100)}%`,
              background: 'rgba(16,185,129,0.7)',
              borderRadius: 2,
              transition: 'width 0.1s linear',
            }}
          />
        </div>
        <p style={{ fontFamily: 'Inter', fontSize: 11, color: 'rgba(255,255,255,0.2)', fontVariantNumeric: 'tabular-nums' }}>
          {Math.round(progress * 100)}%
        </p>
      </div>
    </div>
  );
}

export default function ScrollSequenceSection() {
  const containerRef    = useRef(null);
  const canvasRef       = useRef(null);
  const currentFrameRef = useRef(0);
  const isInViewRef     = useRef(false);

  const [loadProgress, setLoadProgress] = useState(0);

  // Raw scroll progress as a MotionValue (0 → 1)
  const rawProgress  = useMotionValue(0);
  // Spring-smoothed version for frame scrubbing
  const smoothProgress = useSpring(rawProgress, { stiffness: 90, damping: 24, restDelta: 0.0001 });

  const handleProgress = useCallback((p) => setLoadProgress(p), []);
  const { imagesRef, isReadyRef, drawFrame } = useImageSequence(handleProgress);

  // ── Scroll tracking (native, passive) ────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;

      const rect           = el.getBoundingClientRect();
      const scrollHeight   = el.offsetHeight - window.innerHeight;
      const scrolled       = -rect.top;                          // px scrolled past container top
      const progress       = Math.max(0, Math.min(1, scrolled / scrollHeight));

      rawProgress.set(progress);
      isInViewRef.current = scrolled >= 0 && scrolled <= scrollHeight + window.innerHeight;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise
    return () => window.removeEventListener('scroll', onScroll);
  }, [rawProgress]);

  // ── Canvas RAF render loop ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let rafId;

    function render() {
      if (isReadyRef.current) {
        const targetFrame  = Math.round(smoothProgress.get() * (TOTAL_FRAMES - 1));
        const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetFrame));
        if (clampedFrame !== currentFrameRef.current) {
          currentFrameRef.current = clampedFrame;
          drawFrame(canvas, clampedFrame);
        }
      }
      rafId = requestAnimationFrame(render);
    }

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [drawFrame, isReadyRef, smoothProgress]);

  // ── Canvas resize ─────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const obs = new ResizeObserver(() => {
      if (isReadyRef.current) drawFrame(canvas, currentFrameRef.current);
    });
    obs.observe(canvas);
    return () => obs.disconnect();
  }, [drawFrame, isReadyRef]);

  // Derived motion values for overlays / progress bar
  const progressBarScale = useTransform(smoothProgress, [0, 1], [0, 1]);
  const cornerOpacity    = useTransform(rawProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);
  const barOpacity       = useTransform(rawProgress, [0.85, 1], [1, 0]);

  return (
    <>
      {/*
       * SCROLL SPACER — creates the scroll distance.
       * Must have NO overflow, NO transform, NO filter.
       * The fixed canvas sits on top of this space visually.
       */}
      <div
        ref={containerRef}
        style={{ height: '420vh', position: 'relative' }}
        aria-label="Bull and Bear market animation sequence"
      >
        {/*
         * FIXED CANVAS OVERLAY
         * Covers the full viewport. Stays locked to the screen.
         * Visible only while containerRef is in the scroll zone (handled below via CSS).
         */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            background: '#050505',
          }}
        >
          {/* Loading */}
          <LoadingOverlay progress={loadProgress} />

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            aria-label="Animated Bull vs Bear market sequence"
            role="img"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              background: '#050505',
            }}
          />

          {/* Vignettes */}
          <div style={{ position: 'absolute', inset: '0 auto auto 0', right: 0, top: 0, height: 128, background: 'linear-gradient(to bottom, #050505, transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: 128, background: 'linear-gradient(to top, #050505, transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: '0 auto 0 0', width: 128, background: 'linear-gradient(to right, #050505, transparent)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', inset: '0 0 0 auto', width: 128, background: 'linear-gradient(to left, #050505, transparent)', pointerEvents: 'none' }} />

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 32,
              left: '50%',
              translateX: '-50%',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              opacity: barOpacity,
            }}
          >
            <div style={{ width: 96, height: 1, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
              <motion.div
                style={{
                  height: '100%',
                  background: 'rgba(16,185,129,0.6)',
                  borderRadius: 2,
                  scaleX: progressBarScale,
                  transformOrigin: 'left',
                }}
              />
            </div>
          </motion.div>

          {/* Corner badge */}
          <motion.div
            style={{
              position: 'absolute',
              top: 32,
              right: 32,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              pointerEvents: 'none',
              opacity: cornerOpacity,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'Inter', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Bull/Bear Dynamics
            </span>
          </motion.div>

          {/* Parallax text overlays */}
          {OVERLAYS.map((o) => (
            <ParallaxOverlay
              key={o.text}
              text={o.text}
              sub={o.sub}
              progress={smoothProgress}
              from={o.from}
              to={o.to}
            />
          ))}
        </div>
      </div>
    </>
  );
}
