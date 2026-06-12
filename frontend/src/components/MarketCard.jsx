import React from 'react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

const MarketCard = ({ title, value, change, data }) => {
  const isPositive = change >= 0;
  const color = isPositive ? '#00C853' : '#FF1744';

  return (
    <div style={{
      backgroundColor: 'var(--tv-panel-bg)',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid var(--tv-border)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      minWidth: '220px'
    }}>
      <div style={{ color: 'var(--tv-text-muted)', fontSize: '14px', fontWeight: '500' }}>
        {title}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
            {value}
          </div>
          <div style={{ color: color, fontSize: '14px', fontWeight: '600', marginTop: '4px' }}>
            {isPositive ? '+' : ''}{change}%
          </div>
        </div>
        
        <div style={{ width: '80px', height: '40px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke={color} 
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
