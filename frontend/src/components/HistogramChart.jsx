import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

const HistogramChart = ({ data, strikePrice = null }) => {
  if (!data || data.length === 0) return <div style={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No distribution data</div>;
  
  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--tv-border)" vertical={false} />
          <XAxis 
            dataKey="price" 
            stroke="var(--tv-text-muted)" 
            tick={{ fill: 'var(--tv-text-muted)' }} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(val) => `$${Number(val).toFixed(0)}`}
          />
          <YAxis 
            stroke="var(--tv-text-muted)" 
            tick={{ fill: 'var(--tv-text-muted)' }} 
            tickLine={false} 
            axisLine={false} 
            orientation="right"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: 'var(--tv-panel-bg)', borderColor: 'var(--tv-border)', borderRadius: '8px' }}
            itemStyle={{ color: 'white' }}
            labelFormatter={(label) => `Price: $${Number(label).toFixed(2)}`}
            formatter={(value) => [value, 'Frequency']}
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
          />
          
          {strikePrice !== null && (
            <ReferenceLine x={strikePrice} stroke="var(--tv-down)" strokeDasharray="3 3" label={{ position: 'top', value: 'Strike', fill: 'var(--tv-down)' }} />
          )}

          <Bar dataKey="count" fill="var(--tv-blue)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;
