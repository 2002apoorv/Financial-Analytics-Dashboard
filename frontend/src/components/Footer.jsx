import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: '#0d1117',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '60px 50px 30px 50px',
      color: 'var(--tv-text-muted)',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/logo.png" alt="TradeX Logo" style={{ width: '32px', height: '32px', borderRadius: '8px', objectFit: 'cover' }} />
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', letterSpacing: '0.5px' }}>TradeX</span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'var(--tv-text-muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--tv-text-muted)'}>Home</Link>
            <Link to="/app" style={{ color: 'var(--tv-text-muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--tv-text-muted)'}>Markets</Link>
            <a href="#" style={{ color: 'var(--tv-text-muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--tv-text-muted)'}>About Us</a>
            <a href="#" style={{ color: 'var(--tv-text-muted)', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = 'white'} onMouseOut={(e) => e.target.style.color = 'var(--tv-text-muted)'}>Terms</a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingTop: '30px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontSize: '13px'
        }}>
          <p style={{ margin: 0 }}>&copy; {currentYear} TradeX Analytics. All rights reserved.</p>
          <p style={{ margin: 0 }}>Data provided for educational and analytical purposes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
