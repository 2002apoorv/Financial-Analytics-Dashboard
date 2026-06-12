import HeroSection from '../components/HeroSection';
import ScrollSequenceSection from '../components/ScrollSequenceSection';
import InsightsSection from '../components/InsightsSection';
import FooterCTA from '../components/FooterCTA';

/**
 * MarketPulse — Premium Scrollytelling Landing Page
 *
 * Page structure:
 *  1. HeroSection — fullscreen cinematic hero
 *  2. ScrollSequenceSection — sticky canvas, 218-frame Bull/Bear sequence (420vh)
 *  3. InsightsSection — 3 premium insight cards + feature strip
 *  4. FooterCTA — large "Trade Smarter" CTA
 */
export default function LandingPage() {
  return (
    <main
      id="marketpulse-landing"
      style={{ background: '#050505' }}
    >
      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        className="mp-grain"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Scroll Canvas Sequence */}
      <ScrollSequenceSection />

      {/* 3. Insights */}
      <InsightsSection />

      {/* 4. Footer CTA */}
      <FooterCTA />
    </main>
  );
}
