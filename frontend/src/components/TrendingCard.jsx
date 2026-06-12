import React from 'react';
import { useNavigate } from 'react-router-dom';

const TrendingCard = ({ ticker, name, price, change }) => {
  const navigate = useNavigate();
  const isPositive = change >= 0;
  const color = isPositive ? '#00C853' : '#FF1744';

  return (
    <div 
      onClick={() => navigate(`/app?ticker=${ticker}`)}
      style={{
        backgroundColor: 'var(--tv-panel-bg)',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid var(--tv-border)',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
        e.currentTarget.style.boxShadow = `0 8px 25px rgba(${isPositive ? '0,200,83' : '255,23,68'}, 0.15)`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = 'var(--tv-border)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>{ticker}</span>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>${price}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'var(--tv-text-muted)', fontSize: '13px' }}>{name}</span>
        <span style={{ 
          color: color, 
          fontSize: '14px', 
          fontWeight: '600',
          backgroundColor: `${color}15`,
          padding: '2px 8px',
          borderRadius: '4px'
        }}>
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};

export default TrendingCard;
