import React, { useMemo } from 'react';
import { ResponsiveContainer, ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from 'recharts';

const Chart = ({ data, dataKey, xKey = "date", color = "var(--tv-up)", isMultiLine = false, strikePrice = null }) => {
  if (!data || data.length === 0) return <div style={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>No chart data</div>;
  
  // Memoize path keys for multiline
  const pathKeys = useMemo(() => {
    if (!isMultiLine || !data[0]) return [];
    return Object.keys(data[0]).filter(key => key.startsWith('path'));
  }, [data, isMultiLine]);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <ComposedChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--tv-border)" vertical={false} />
          <XAxis 
            dataKey={xKey} 
            stroke="var(--tv-text-muted)" 
            tick={{ fill: 'var(--tv-text-muted)' }} 
            tickLine={false} 
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            stroke="var(--tv-text-muted)" 
            tick={{ fill: 'var(--tv-text-muted)' }} 
            tickLine={false} 
            axisLine={false} 
            orientation="right"
          />
          {!isMultiLine && (
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--tv-panel-bg)', borderColor: 'var(--tv-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'white' }}
            />
          )}
          
          {strikePrice !== null && (
            <ReferenceLine y={strikePrice} stroke="rgba(255,255,255,0.5)" strokeDasharray="3 3" label={{ position: 'left', value: 'Strike', fill: 'white' }} />
          )}

          {isMultiLine ? (
            pathKeys.map((key, index) => (
              <Line 
                key={key} 
                type="monotone" 
                dataKey={key} 
                stroke="var(--tv-blue)" 
                dot={false} 
                strokeWidth={1} 
                opacity={0.15} 
                isAnimationActive={false} // Disable animation for many lines to improve perf
              />
            ))
          ) : (
            <Line type="monotone" dataKey={dataKey} stroke={color} dot={false} strokeWidth={2} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
