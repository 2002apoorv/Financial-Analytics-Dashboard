from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import yfinance as yf
import pandas as pd
import numpy as np

from models.blackscholes import black_scholes_call, black_scholes_put, calculate_greeks
from models.garch import get_garch_volatility
from models.montecarlo import run_monte_carlo

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def fetch_data(ticker: str):
    data = yf.download(ticker, start="2020-01-01", progress=False)
    if isinstance(data.columns, pd.MultiIndex):
        data.columns = data.columns.get_level_values(0)
    if data.empty or "Close" not in data.columns:
        raise HTTPException(status_code=404, detail="Failed to fetch data")
    return data

@app.get("/stock")
def get_stock(ticker: str = "TSLA"):
    data = fetch_data(ticker)
    
    # Historical data for chart
    df = data.tail(100).reset_index()
    chart_data = []
    for _, row in df.iterrows():
        # Handle index which might be Date or something else depending on yfinance
        date_val = row.get("Date", row.get("index"))
        if hasattr(date_val, 'date'):
            date_str = str(date_val.date())
        else:
            date_str = str(date_val)
            
        chart_data.append({
            "date": date_str,
            "open": float(row["Open"]),
            "high": float(row["High"]),
            "low": float(row["Low"]),
            "close": float(row["Close"]),
        })
        
    try:
        live_data = yf.download(ticker, period="1d", interval="1m", progress=False)
        close_vals = live_data["Close"]
        if isinstance(close_vals, pd.DataFrame):
            live_price = float(close_vals.iloc[-1, 0])
        else:
            live_price = float(close_vals.iloc[-1])
    except Exception:
        live_price = float(data["Close"].dropna().iloc[-1])

    return {"ticker": ticker, "live_price": live_price, "chart_data": chart_data}

@app.get("/live_price")
def get_live_price_api(ticker: str):
    try:
        # Use Ticker.fast_info — thread-safe, no global state issues like yf.download()
        t = yf.Ticker(ticker)
        live_price = t.fast_info.last_price
        if live_price is not None and not (isinstance(live_price, float) and (live_price != live_price)):  # check not NaN
            return {"ticker": ticker, "live_price": float(live_price)}
        # Fallback: use history() which is also per-Ticker and thread-safe
        hist = t.history(period="1d", interval="1m")
        if hist.empty:
            raise HTTPException(status_code=404, detail="No data for ticker")
        return {"ticker": ticker, "live_price": float(hist["Close"].iloc[-1])}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@app.get("/price")
def get_price(S: float, K: float, T: float, r: float, sigma: float):
    call_p = black_scholes_call(S, K, T, r, sigma)
    put_p = black_scholes_put(S, K, T, r, sigma)
    greeks = calculate_greeks(S, K, T, r, sigma)
    
    # Payoff data
    stock_prices = np.linspace(S*0.5, S*1.5, 100)
    call_payoff = np.maximum(stock_prices-K, 0) - call_p
    put_payoff = np.maximum(K-stock_prices, 0) - put_p
    
    payoff_data = []
    for i in range(len(stock_prices)):
        payoff_data.append({
            "price": float(stock_prices[i]),
            "call": float(call_payoff[i]),
            "put": float(put_payoff[i])
        })
        
    return {
        "call_price": float(call_p),
        "put_price": float(put_p),
        "greeks": greeks,
        "payoff_data": payoff_data
    }

@app.get("/volatility")
def get_volatility(ticker: str = "TSLA"):
    data = fetch_data(ticker)
    sigma, vol_path = get_garch_volatility(data)
    return {
        "sigma": sigma,
        "historical_volatility": vol_path[-100:] # limit points for UI
    }

@app.get("/montecarlo")
def get_monte_carlo(S: float, K: float, T: float, r: float, sigma: float, simulations: int = 500):
    res = run_monte_carlo(S, K, T, r, sigma, simulations)
    
    # Calculate differences vs Black-Scholes
    bs_call = black_scholes_call(S, K, T, r, sigma)
    bs_put = black_scholes_put(S, K, T, r, sigma)
    res["call_diff"] = float(res["call_price"] - bs_call)
    res["put_diff"] = float(res["put_price"] - bs_put)
    
    # Format paths specifically for Recharts (array of steps, where each step has path0, path1, etc)
    raw_paths = res.pop("paths", [])
    formatted_paths = []
    if raw_paths:
        num_steps = len(raw_paths[0])
        for i in range(num_steps):
            step_obj = {"step": i}
            for j, p in enumerate(raw_paths):
                step_obj[f"path{j}"] = float(p[i])
            formatted_paths.append(step_obj)
    res["simulation_paths"] = formatted_paths
    
    return res
