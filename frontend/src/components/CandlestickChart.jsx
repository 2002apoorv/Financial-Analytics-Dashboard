import React from 'react';
import Plot from 'react-plotly.js';

const CandlestickChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div style={{ color: 'var(--tv-text-muted)', textAlign: 'center', padding: '50px' }}>No data available for chart.</div>;
  }

  const x = data.map(d => d.date);
  const open = data.map(d => d.open);
  const high = data.map(d => d.high);
  const low = data.map(d => d.low);
  const close = data.map(d => d.close);

  return (
    <div style={{ width: '100%', height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
      <Plot
        data={[
          {
            x: x,
            close: close,
            decreasing: { line: { color: '#F23645' } }, // var(--tv-down) but Plotly needs hex
            high: high,
            increasing: { line: { color: '#089981' } }, // var(--tv-up) but Plotly needs hex
            line: { color: 'rgba(31,119,180,1)' },
            low: low,
            open: open,
            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
          }
        ]}
        layout={{
          dragmode: 'zoom',
          margin: { r: 10, t: 25, b: 40, l: 60 },
          showlegend: false,
          xaxis: {
            autorange: true,
            title: '',
            type: 'date',
            gridcolor: 'rgba(255, 255, 255, 0.05)',
            zerolinecolor: 'rgba(255, 255, 255, 0.05)',
            tickfont: { color: '#8b93a6' },
            rangeslider: { visible: false } // Hide range slider to look more like TV
          },
          yaxis: {
            autorange: true,
            domain: [0, 1],
            type: 'linear',
            gridcolor: 'rgba(255, 255, 255, 0.05)',
            zerolinecolor: 'rgba(255, 255, 255, 0.05)',
            tickfont: { color: '#8b93a6' },
            side: 'right' // TV style usually has price on right
          },
          paper_bgcolor: 'transparent',
          plot_bgcolor: 'transparent',
          font: { color: '#8b93a6' }
        }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
        config={{ displayModeBar: false, responsive: true }}
      />
    </div>
  );
};

export default CandlestickChart;
