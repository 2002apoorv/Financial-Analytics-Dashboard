import React, { useState } from 'react';
import { Search } from 'lucide-react';

const E = {
  emerald:   '#10b981',
  emeraldLt: '#34d399',
  border:    'rgba(16,185,129,0.18)',
  borderBase:'rgba(255,255,255,0.06)',
  muted:     'rgba(255,255,255,0.38)',
  text:      'rgba(255,255,255,0.88)',
  panel:     'rgba(12,16,13,0.65)',
};

const Sidebar = ({ selectedTicker, onSelectTicker, prices, watchlist, onSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim().toUpperCase());
      setSearchInput('');
    }
  };

  return (
    <div style={{
      width: '270px',
      background: 'rgba(5,5,5,0.85)',
      borderRight: `1px solid ${E.borderBase}`,
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      height: '100%',
      padding: '24px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: '18px',
      flexShrink: 0,
    }}>

      {/* Search bar */}
      <form onSubmit={handleSearch}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(12,16,13,0.7)',
          border: `1px solid ${focused ? E.border : E.borderBase}`,
          borderRadius: '50px',
          padding: '4px 16px',
          gap: '8px',
          transition: 'border-color 0.25s, box-shadow 0.25s',
          boxShadow: focused ? '0 0 20px rgba(16,185,129,0.15)' : 'none',
        }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        >
          <Search size={14} color={focused ? E.emerald : E.muted} style={{ transition: 'color 0.25s', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search ticker…"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: E.text,
              padding: '10px 0',
              width: '100%',
              outline: 'none',
              textTransform: 'uppercase',
              fontSize: '13px',
              letterSpacing: '0.06em',
              fontFamily: 'inherit',
            }}
          />
        </div>
      </form>

      {/* Watchlist header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 4px' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: E.emerald, boxShadow: `0 0 8px ${E.emerald}`, animation: 'dash-glow-pulse 2s ease-in-out infinite' }} />
        <span style={{ color: E.muted, fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.14em' }}>
          Watchlist
        </span>
      </div>

      {/* Ticker list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
        {watchlist.map(ticker => {
          const isActive = ticker === selectedTicker;
          return (
            <div
              key={ticker}
              onClick={() => onSelectTicker(ticker)}
              style={{
                padding: '14px 18px',
                borderRadius: '14px',
                border: `1px solid ${isActive ? E.border : E.borderBase}`,
                background: isActive ? 'rgba(16,185,129,0.1)' : 'rgba(12,16,13,0.5)',
                boxShadow: isActive ? '0 0 24px rgba(16,185,129,0.15)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.25s ease',
              }}
              onMouseOver={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(16,185,129,0.06)';
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.12)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseOut={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'rgba(12,16,13,0.5)';
                  e.currentTarget.style.borderColor = E.borderBase;
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{
                fontWeight: '700', fontSize: '13px', letterSpacing: '0.06em',
                color: isActive ? '#fff' : E.text
              }}>
                {ticker}
              </span>
              <span style={{
                fontWeight: '600', fontSize: '13px',
                color: isActive ? E.emeraldLt : E.emerald,
                letterSpacing: '-0.01em'
              }}>
                {prices && prices[ticker] ? `$${prices[ticker].toFixed(2)}` : '---'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
