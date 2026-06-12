import React from 'react';
import { motion } from 'framer-motion';
import { Target, Calculator, RefreshCw, Eye, ShieldAlert, Zap } from 'lucide-react';

const CARDS_DATA = [
  {
    title: "Predict Volatility",
    description: "Forecast market volatility using advanced statistical models.",
    icon: Target
  },
  {
    title: "Price Options Instantly",
    description: "Calculate accurate call and put prices using proven financial models.",
    icon: Calculator
  },
  {
    title: "Simulate Market Scenarios",
    description: "Run thousands of simulations to explore possible future outcomes.",
    icon: RefreshCw
  },
  {
    title: "Visualize Risk",
    description: "Understand profit, loss, and risk before entering a trade.",
    icon: Eye
  },
  {
    title: "Analyze Market Sensitivity",
    description: "Measure how price changes impact your positions using Greeks.",
    icon: ShieldAlert
  },
  {
    title: "Real-Time Market Data",
    description: "Track live stock prices and market movements instantly.",
    icon: Zap
  }
];

const ScrollFeatures = () => {
  return (
    <section style={{
      backgroundColor: '#161b22',
      padding: '120px 20px',
      color: 'white',
      fontFamily: 'Inter, sans-serif',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>

        <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '700px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '800',
            marginBottom: '20px',
            lineHeight: '1.2',
            letterSpacing: '-1px',
            color: 'white'
          }}>
            Understand the Market <br /> Like Never Before
          </h2>
          <p style={{
            fontSize: '20px',
            color: 'var(--tv-text-muted)',
            lineHeight: '1.6'
          }}>
            Go beyond basic charts. Use data, models, and simulations
            <br />  to make smarter trading decisions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          width: '100%'
        }}>
          {CARDS_DATA.map((card, index) => {
            const IconComponent = card.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                style={{
                  backgroundColor: 'rgba(28, 31, 38, 0.6)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  padding: '40px 30px',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    backgroundColor: 'rgba(30, 75, 216, 0.15)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'var(--tv-blue)',
                    flexShrink: 0
                  }}>
                    <IconComponent size={30} />
                  </div>

                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    margin: 0,
                    color: 'white'
                  }}>
                    {card.title}
                  </h3>
                </div>
                <p style={{
                  fontSize: '18px',
                  color: 'var(--tv-text-muted)',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScrollFeatures;
