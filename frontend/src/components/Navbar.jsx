import React from 'react';
import { TrendingUp } from 'lucide-react';

const Navbar = () => {
  return (
    <div style={{
      backgroundColor: 'var(--tv-panel-bg)',
      padding: '15px 25px',
      borderBottom: '1px solid var(--tv-border)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px'
    }}>
      <img src="/logo.png" alt="TradersQuest Logo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
      <div>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>TradersQuest</h1>
        <p style={{ margin: 0, color: 'var(--tv-text-muted)', fontSize: '13px' }}>Options Analytics Dashboard • Full Stack</p>
      </div>
    </div>
  );
};

export default Navbar;
