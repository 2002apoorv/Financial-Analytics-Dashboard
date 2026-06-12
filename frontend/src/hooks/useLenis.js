import { useEffect } from 'react';

/**
 * useLenis — Initializes Lenis smooth scroll.
 * Integrates with Framer Motion's useScroll via native scroll events.
 * Uses @studio-freight/lenis (legacy package alias for lenis).
 */
export function useLenis() {
  useEffect(() => {
    // Dynamically import to avoid SSR issues
    let lenis;
    let rafId;

    const init = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis');
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          gestureOrientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // Lenis unavailable — native scroll is fine
        console.warn('Lenis not available, using native scroll:', e.message);
      }
    };

    init();

    return () => {
      if (lenis) lenis.destroy();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
