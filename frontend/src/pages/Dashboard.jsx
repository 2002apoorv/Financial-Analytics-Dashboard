import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeNavbar from '../components/HomeNavbar';
import Sidebar from '../components/Sidebar';
import Chart from '../components/Chart';
import HistogramChart from '../components/HistogramChart';
import CandlestickChart from '../components/CandlestickChart';

/* ─── Shared accent tokens (mirrors landing page) ─── */
const E = {
  emerald:   '#10b981',
  emeraldLt: '#34d399',
  emeraldDim: 'rgba(16,185,129,0.15)',
  border:    'rgba(16,185,129,0.18)',
  borderBase:'rgba(255,255,255,0.06)',
  muted:     'rgba(255,255,255,0.38)',
  text:      'rgba(255,255,255,0.88)',
  panel:     'rgba(12,16,13,0.65)',
  bg:        '#050505',
};

/* ─── Glassmorphism panel ─── */
const Panel = ({ children, style = {}, glow = false }) => (
  <div style={{
    background: E.panel,
    border: `1px solid ${glow ? E.border : E.borderBase}`,
    borderRadius: '20px',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    boxShadow: glow
      ? `0 0 40px rgba(16,185,129,0.08), 0 8px 32px rgba(0,0,0,0.45)`
      : `0 8px 32px rgba(0,0,0,0.45)`,
    ...style
  }}>
    {children}
  </div>
);

/* ─── Metric card ─── */
const MetricCard = ({ title, value, subtext, accent = false }) => (
  <div
    style={{
      background: E.panel,
      border: `1px solid ${accent ? E.border : E.borderBase}`,
      borderRadius: '18px',
      backdropFilter: 'blur(20px)',
      boxShadow: accent
        ? `0 0 30px rgba(16,185,129,0.1), 0 8px 32px rgba(0,0,0,0.4)`
        : `0 8px 32px rgba(0,0,0,0.4)`,
      padding: '24px 28px',
      flex: 1,
      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
      cursor: 'default',
    }}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = `0 0 40px rgba(16,185,129,0.18), 0 16px 40px rgba(0,0,0,0.5)`;
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = accent
        ? `0 0 30px rgba(16,185,129,0.1), 0 8px 32px rgba(0,0,0,0.4)`
        : `0 8px 32px rgba(0,0,0,0.4)`;
    }}
  >
    <div style={{ color: E.muted, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
      {title}
    </div>
    <div style={{
      fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em',
      background: accent
        ? `linear-gradient(135deg, ${E.emerald} 0%, ${E.emeraldLt} 100%)`
        : 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)',
      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
    }}>
      {value}
    </div>
    {subtext && <div style={{ color: E.muted, fontSize: '12px', marginTop: '6px', letterSpacing: '0.02em' }}>{subtext}</div>}
  </div>
);

/* ─── Section heading ─── */
const SectionHeading = ({ children }) => (
  <h3 style={{ margin: '0 0 18px 0', color: E.text, fontSize: '14px', fontWeight: '600', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
    <span style={{ color: E.emerald, marginRight: '8px' }}>—</span>{children}
  </h3>
);

/* ═══════════════════════════════════════════ Dashboard ═══════════════════════════════════════════ */
const Dashboard = () => {
  const location  = useLocation();
  const navigate  = useNavigate();
  const params    = new URLSearchParams(location.search);
  const selectedTicker = params.get('ticker') || 'AAPL';

  const [watchlist,   setWatchlist]   = useState(['AAPL','TSLA','MSFT','GOOGL','AMZN','NOW']);
  const [prices,      setPrices]      = useState({});
  const [stockData,   setStockData]   = useState(null);
  const [priceData,   setPriceData]   = useState(null);
  const [mcData,      setMcData]      = useState(null);
  const [volData,     setVolData]     = useState(null);
  const [activeTab,   setActiveTab]   = useState('pricing');
  const [loading,     setLoading]     = useState(false);

  const [maturity,  setMaturity]  = useState(0.5);
  const [riskFree,  setRiskFree]  = useState(0.05);
  const [strike,    setStrike]    = useState(0);

  const fetchWatchlistPrices = useCallback(async () => {
    try {
      const results = await Promise.allSettled(
        watchlist.map(ticker =>
          axios.get(`/api/live_price?ticker=${ticker}`)
            .then(res => ({ ticker, price: res.data.live_price }))
        )
      );
      const newPrices = {};
      results.forEach(r => { if (r.status === 'fulfilled') newPrices[r.value.ticker] = r.value.price; });
      setPrices(prev => ({ ...prev, ...newPrices }));
    } catch (e) { console.error('Watchlist fetch error:', e); }
  }, [watchlist]);

  useEffect(() => {
    fetchWatchlistPrices();
    const id = setInterval(fetchWatchlistPrices, 10000);
    return () => clearInterval(id);
  }, [fetchWatchlistPrices]);

  const fetchSelectedData = async () => {
    setLoading(true);
    setStockData(null); setPriceData(null); setVolData(null); setMcData(null);
    try {
      const res = await axios.get(`/api/stock?ticker=${selectedTicker}`);
      setStockData(res.data);
      setPrices(prev => ({ ...prev, [selectedTicker]: res.data.live_price }));
      setStrike(res.data.live_price);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  const fetchModelData = async () => {
    if (!stockData) return;
    try {
      const S = stockData.live_price;
      const volRes = await axios.get(`/api/volatility?ticker=${selectedTicker}`);
      setVolData(volRes.data);
      const sigma = volRes.data.sigma;
      const pRes  = await axios.get(`/api/price`,       { params: { S, K: strike || S, T: maturity, r: riskFree, sigma } });
      const mcRes = await axios.get(`/api/montecarlo`,  { params: { S, K: strike || S, T: maturity, r: riskFree, sigma, simulations: 300 } });
      setPriceData(pRes.data);
      setMcData(mcRes.data);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { fetchSelectedData(); },         [selectedTicker]);
  useEffect(() => { if (stockData) fetchModelData(); }, [stockData, maturity, riskFree, strike]);

  const handleSearch       = t => { if (!watchlist.includes(t)) setWatchlist(p => [t, ...p]); navigate(`/app?ticker=${t}`); };
  const handleSelectTicker = t => navigate(`/app?ticker=${t}`);

  const tabs = ['pricing', 'montecarlo', 'volatility', 'greeks'];
  const tabLabel = t => t === 'montecarlo' ? 'Monte Carlo' : t.charAt(0).toUpperCase() + t.slice(1);

  /* ── inputStyle shared ── */
  const inputStyle = {
    padding: '9px 14px', borderRadius: '50px',
    border: `1px solid ${E.borderBase}`,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: E.text, outline: 'none', width: '90px', fontSize: '13px',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: E.bg, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" }}>
      {/* Film grain */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9998, opacity: 0.022,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '128px 128px'
      }} />

      {/* Ambient radial glow */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)'
      }} />

      <HomeNavbar />

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', marginTop: '73px', position: 'relative', zIndex: 1 }}>
        <Sidebar
          selectedTicker={selectedTicker}
          onSelectTicker={handleSelectTicker}
          prices={prices}
          watchlist={watchlist}
          onSearch={handleSearch}
        />

        {/* ── Main content ── */}
        <div style={{ flex: 1, padding: '32px 36px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* ── Page header ── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                {/* Ticker badge */}
                <span style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(52,211,153,0.12) 100%)',
                  border: `1px solid ${E.border}`,
                  color: E.emeraldLt,
                  padding: '6px 18px', borderRadius: '50px',
                  fontSize: '15px', fontWeight: '700', letterSpacing: '0.08em',
                  boxShadow: '0 0 20px rgba(16,185,129,0.15)'
                }}>
                  {selectedTicker}
                </span>
                <h1 style={{ margin: 0, color: E.text, fontSize: '26px', fontWeight: '700', letterSpacing: '-0.03em' }}>
                  Analytics
                </h1>
                {loading && (
                  <span style={{ color: E.emerald, fontSize: '12px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    ⟳ Updating…
                  </span>
                )}
              </div>
              <p style={{ margin: '8px 0 0 0', color: E.muted, fontSize: '13px', letterSpacing: '0.02em' }}>
                Black-Scholes · Monte Carlo · GARCH Volatility · Greeks
              </p>
            </div>
          </div>

          {/* ── Controls pill ── */}
          <Panel style={{ padding: '18px 28px', display: 'flex', gap: '28px', alignItems: 'center', borderRadius: '50px', flexWrap: 'wrap' }}>
            {[
              { label: 'Strike Price', val: strike, set: setStrike, min: stockData ? Math.floor(stockData.live_price * 0.5) : 0, max: stockData ? Math.ceil(stockData.live_price * 1.5) : 1000, step: stockData && stockData.live_price < 50 ? 0.5 : 1, isRange: true },
              { label: 'Maturity (yrs)', val: maturity, set: setMaturity, step: 0.1 },
              { label: 'Risk-Free Rate',  val: riskFree,  set: setRiskFree,  step: 0.01 },
            ].map(({ label, val, set, step, min, max, isRange }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <label style={{ color: E.muted, fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{label}</label>
                {isRange && (
                  <input type="range" min={min} max={max} step={step} value={val}
                    onChange={e => set(Number(e.target.value))}
                    style={{ width: '110px', cursor: 'pointer', accentColor: E.emerald }} />
                )}
                <input type="number" step={step} value={val} onChange={e => set(Number(e.target.value))} style={inputStyle} />
              </div>
            ))}
          </Panel>

          {/* ── Top metric strip ── */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <MetricCard title="Live Price"        value={stockData  ? `$${stockData.live_price.toFixed(2)}` : '---'} accent />
            <MetricCard title="BS Call Price"     value={priceData  ? `$${priceData.call_price.toFixed(2)}`  : '---'} />
            <MetricCard title="BS Put Price"      value={priceData  ? `$${priceData.put_price.toFixed(2)}`   : '---'} />
            <MetricCard title="Annual Volatility" value={volData    ? `${(volData.sigma * 100).toFixed(2)}%`  : '---'} />
          </div>

          {/* ── Tab bar ── */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              display: 'flex',
              background: 'rgba(5,5,5,0.8)',
              border: `1px solid ${E.borderBase}`,
              borderRadius: '50px',
              padding: '5px',
              gap: '4px',
              backdropFilter: 'blur(20px)'
            }}>
              {tabs.map(tab => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: '11px 28px',
                      color: isActive ? '#050505' : E.muted,
                      background: isActive
                        ? `linear-gradient(135deg, ${E.emerald} 0%, ${E.emeraldLt} 100%)`
                        : 'transparent',
                      borderRadius: '50px',
                      fontWeight: '600',
                      fontSize: '13px',
                      letterSpacing: '0.04em',
                      transition: 'all 0.3s ease',
                      boxShadow: isActive ? '0 4px 20px rgba(16,185,129,0.35)' : 'none',
                    }}
                    onMouseOver={e => { if (!isActive) e.currentTarget.style.color = E.emeraldLt; }}
                    onMouseOut={e => { if (!isActive) e.currentTarget.style.color = E.muted; }}
                  >
                    {tabLabel(tab)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════ TAB CONTENT ══════════════ */}

          {/* ─ Pricing tab ─ */}
          {activeTab === 'pricing' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Panel style={{ padding: '24px' }} glow>
                <SectionHeading>Stock Price History</SectionHeading>
                <CandlestickChart data={stockData?.chart_data} />
              </Panel>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                <MetricCard title="Stock Price" value={stockData  ? `$${stockData.live_price.toFixed(2)}` : '---'} accent />
                <MetricCard title="Call Price"  value={priceData  ? `$${priceData.call_price.toFixed(2)}` : '---'} />
                <MetricCard title="Put Price"   value={priceData  ? `$${priceData.put_price.toFixed(2)}`  : '---'} />
              </div>

              <Panel style={{ padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }} glow>
                <div style={{ color: E.muted, fontSize: '11px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                  Predicted Annual Volatility · GARCH(1,1)
                </div>
                <div style={{
                  fontSize: '42px', fontWeight: '800', letterSpacing: '-0.04em',
                  background: `linear-gradient(135deg, ${E.emerald} 0%, ${E.emeraldLt} 100%)`,
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
                }}>
                  {volData ? `${(volData.sigma * 100).toFixed(2)}%` : '---'}
                </div>
              </Panel>
            </div>
          )}

          {/* ─ Monte Carlo tab ─ */}
          {activeTab === 'montecarlo' && mcData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <MetricCard title="MC Call Price"   value={`$${mcData.call_price.toFixed(2)}`}  subtext={`95% CI: [${mcData.ci_lower.toFixed(2)}, ${mcData.ci_upper.toFixed(2)}]`} accent />
                <MetricCard title="MC Put Price"    value={`$${mcData.put_price.toFixed(2)}`} />
                <MetricCard title="Probability ITM" value={`${(mcData.prob_above_strike * 100).toFixed(1)}%`} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <Panel style={{ padding: '24px' }} glow>
                  <SectionHeading>Simulation Paths</SectionHeading>
                  <Chart data={mcData.simulation_paths} xKey="step" isMultiLine={true} strikePrice={strike || stockData?.live_price} />
                </Panel>
                <Panel style={{ padding: '24px' }}>
                  <SectionHeading>Price Distribution</SectionHeading>
                  <HistogramChart data={mcData.distribution} strikePrice={strike || stockData?.live_price} />
                </Panel>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <Panel style={{ padding: '24px' }} glow>
                  <SectionHeading>Monte Carlo Convergence</SectionHeading>
                  <Chart data={mcData.convergence} dataKey="price" xKey="simulations" color={E.emerald} strikePrice={priceData?.call_price} />
                </Panel>

                <Panel style={{ padding: '24px' }}>
                  <SectionHeading>Model Insights</SectionHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { label: 'Avg Final Price', val: `$${mcData.average_final_price.toFixed(2)}`, color: E.text },
                      { label: 'Call Diff (vs BS)', val: `${mcData.call_diff > 0 ? '+' : ''}${mcData.call_diff.toFixed(3)}`, color: Math.abs(mcData.call_diff) < 0.05 ? E.muted : mcData.call_diff > 0 ? E.emerald : 'var(--tv-down)' },
                      { label: 'Put Diff (vs BS)',  val: `${mcData.put_diff > 0 ? '+' : ''}${mcData.put_diff.toFixed(3)}`,  color: Math.abs(mcData.put_diff)  < 0.05 ? E.muted : mcData.put_diff  > 0 ? E.emerald : 'var(--tv-down)' },
                    ].map(({ label, val, color }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: `1px solid ${E.borderBase}` }}>
                        <span style={{ color: E.muted, fontSize: '13px' }}>{label}</span>
                        <span style={{ fontWeight: '700', color, fontSize: '13px' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            </div>
          )}

          {/* ─ Volatility tab ─ */}
          {activeTab === 'volatility' && volData && (() => {
            const hv = volData.historical_volatility;
            const avgAnnual = (hv.reduce((s, v) => s + v.volatility, 0) / hv.length) * Math.sqrt(252);
            const maxAnnual = Math.max(...hv.map(v => v.volatility)) * Math.sqrt(252);
            const minAnnual = Math.min(...hv.map(v => v.volatility)) * Math.sqrt(252);
            const cur       = volData.sigma * 100;
            const isElevated = cur > avgAnnual;
            const trendDiff  = ((cur / avgAnnual) - 1) * 100;
            const chartData  = hv
              .filter(v => v.volatility != null && !isNaN(v.volatility))
              .map(v => ({ time: v.time, annualized_vol: Number(v.volatility) * Math.sqrt(252) }));
            return (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <MetricCard title="Predicted Annual Vol" value={`${cur.toFixed(2)}%`}         subtext="GARCH(1,1) Forecast" accent />
                  <MetricCard title="100-Day Avg (Annual)" value={`${avgAnnual.toFixed(2)}%`} />
                  <MetricCard title="100-Day Max (Annual)" value={`${maxAnnual.toFixed(2)}%`} />
                  <MetricCard title="100-Day Min (Annual)" value={`${minAnnual.toFixed(2)}%`} />
                </div>

                <Panel style={{ padding: '24px' }} glow>
                  <SectionHeading>Historical Volatility Trajectory (Annualized)</SectionHeading>
                  <Chart data={chartData} dataKey="annualized_vol" xKey="time" color={E.emerald} />
                </Panel>

                <Panel style={{ padding: '24px' }}>
                  <SectionHeading>Volatility Insights</SectionHeading>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {[
                      { label: 'Market Regime',            val: isElevated ? 'Elevated Volatility' : 'Normal / Low Volatility', color: isElevated ? 'var(--tv-down)' : E.emerald },
                      { label: 'Trend vs 100-Day Average', val: `${trendDiff > 0 ? '+' : ''}${trendDiff.toFixed(1)}%`, color: trendDiff > 0 ? 'var(--tv-down)' : E.emerald },
                    ].map(({ label, val, color }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '14px', borderBottom: `1px solid ${E.borderBase}` }}>
                        <span style={{ color: E.muted, fontSize: '13px' }}>{label}</span>
                        <span style={{ fontWeight: '700', color, fontSize: '13px' }}>{val}</span>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>
            );
          })()}

          {/* ─ Greeks tab ─ */}
          {activeTab === 'greeks' && priceData && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <Panel style={{ padding: '28px 32px' }} glow>
                <SectionHeading>Option Greeks</SectionHeading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <MetricCard title="Delta" value={priceData.greeks.delta.toFixed(4)} accent />
                  <MetricCard title="Gamma" value={priceData.greeks.gamma.toFixed(4)} />
                  <MetricCard title="Vega"  value={priceData.greeks.vega.toFixed(4)} />
                  <MetricCard title="Theta" value={priceData.greeks.theta.toFixed(4)} />
                </div>
              </Panel>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
