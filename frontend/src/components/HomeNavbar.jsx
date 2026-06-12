import React from 'react';
import { Link } from 'react-router-dom';

const HomeNavbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '18px 50px',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(5, 5, 5, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'white' }}>
        {/* Pulse icon */}
        <div style={{ position: 'relative', width: '32px', height: '32px' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(16,185,129,0.2)',
            animation: 'mp-ping 2.4s cubic-bezier(0,0,0.2,1) infinite'
          }} />
          <div style={{
            position: 'relative', width: '32px', height: '32px', borderRadius: '50%',
            border: '1px solid rgba(16,185,129,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
          </div>
        </div>
        <span style={{
          fontSize: '20px', fontWeight: '700', letterSpacing: '-0.02em',
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.75) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>Market<span style={{
          background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
        }}>Pulse</span></span>
      </Link>

      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', letterSpacing: '0.02em', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = '#34d399'}
          onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}>
          Home
        </Link>
        <Link to="/app" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', letterSpacing: '0.02em', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = '#34d399'}
          onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}>
          Markets
        </Link>
        <a href="#" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', letterSpacing: '0.02em', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.target.style.color = '#34d399'}
          onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.55)'}>
          About
        </a>
        <Link to="/signup" style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '13px',
          fontWeight: '600',
          padding: '10px 24px',
          borderRadius: '50px',
          letterSpacing: '0.02em',
          transition: 'all 0.25s ease',
          boxShadow: '0 4px 20px rgba(16,185,129,0.3)'
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(16,185,129,0.5)'; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(16,185,129,0.3)'; }}
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default HomeNavbar;
