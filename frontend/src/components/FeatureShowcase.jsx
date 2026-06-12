import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Calculator, TrendingUp, Sigma, LineChart, Cpu } from 'lucide-react';

const FEATURES = [
  {
    title: "Real-time Market Data",
    description: "Lightning-fast live quotes, charting, and execution data directly to your browser.",
    Icon: Activity
  },
  {
    title: "Option Pricing Engine",
    description: "Instant Black-Scholes calculations to find the theoretical fair value of any options contract across all strikes.",
    Icon: Calculator
  },
  {
    title: "Volatility Prediction",
    description: "Advanced GARCH time-series models to predict future implied volatility, giving you an edge in pricing.",
    Icon: Sigma
  },
  {
    title: "Greeks Analysis",
    description: "Live Delta, Gamma, Theta, and Vega metrics updating tick-by-tick so you can actively manage risk.",
    Icon: TrendingUp
  },
  {
    title: "Payoff Visualization",
    description: "Interactive visual graphs mapping your exact profit and loss scenarios across potential expiration prices.",
    Icon: LineChart
  },
  {
    title: "Monte Carlo Simulation",
    description: "Run thousands of random walk paths to mathematically determine the exact probability of an option expiring ITM.",
    Icon: Cpu
  }
];

// Reusable Mockup Container
const MockupContainer = ({ children }) => (
  <div style={{
    width: '100%',
    maxWidth: '600px',
    height: '400px',
    backgroundColor: 'rgba(28, 31, 38, 0.7)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
    backdropFilter: 'blur(20px)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    {children}
  </div>
);

const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <div style={{ display: 'flex', position: 'relative', width: '100%', backgroundColor: '#0d1117' }}>

      {/* LEFT COLUMN: Sticky Text (40%) */}
      <div style={{
        width: '40%',
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 50px',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '16px',
                backgroundColor: 'rgba(30, 75, 216, 0.15)',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                color: 'var(--tv-blue)', flexShrink: 0
              }}>
                {React.createElement(FEATURES[activeFeature].Icon, { size: 32 })}
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: '800', margin: 0, lineHeight: '1.1', color: 'white' }}>
                {FEATURES[activeFeature].title}
              </h2>
            </div>
            <p style={{ fontSize: '20px', color: 'var(--tv-text-muted)', lineHeight: '1.6', margin: 0 }}>
              {FEATURES[activeFeature].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT COLUMN: Scrolling Mockups (60%) */}
      <div style={{ width: '60%' }}>
        {FEATURES.map((feature, index) => (
          <motion.div
            key={index}
            style={{
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0 50px'
            }}
            viewport={{ amount: 0.5, margin: "0px 0px -10% 0px" }}
            onViewportEnter={() => setActiveFeature(index)}
          >
            <MockupContainer>
              {/* Feature 1: Real-time Data */}
              {index === 0 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video src="/Scrollvid_01.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }} />
                </div>
              )}

              {/* Feature 2: Option Pricing */}
              {index === 1 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video src="/Scrollvid_02.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }} />
                </div>
              )}

              {/* Feature 3: Volatility */}
              {index === 2 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video src="/Scrollvid_03.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }} />
                </div>
              )}

              {/* Feature 4: Greeks */}
              {index === 3 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video src="/Scrollvid_04.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }} />
                </div>
              )}

              {/* Feature 5: Payoff */}
              {index === 4 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video src="/Scrollvid_05.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }} />
                </div>
              )}

              {/* Feature 6: Monte Carlo */}
              {index === 5 && (
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                  <video src="/Scrollvid_06.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'cover' }} />
                </div>
              )}

            </MockupContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeatureShowcase;
