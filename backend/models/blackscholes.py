import numpy as np
from scipy.stats import norm

def black_scholes_call(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)

def black_scholes_put(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T)/(sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)
    return K*np.exp(-r*T)*norm.cdf(-d2) - S*norm.cdf(-d1)

def calculate_greeks(S, K, T, r, sigma):
    d1 = (np.log(S/K) + (r + sigma**2/2)*T) / (sigma*np.sqrt(T))
    d2 = d1 - sigma*np.sqrt(T)

    delta = norm.cdf(d1)
    gamma = norm.pdf(d1)/(S*sigma*np.sqrt(T))
    vega = S*norm.pdf(d1)*np.sqrt(T)
    theta = (
        -(S*norm.pdf(d1)*sigma)/(2*np.sqrt(T))
        - r*K*np.exp(-r*T)*norm.cdf(d2)
    )
    return {
        "delta": float(delta),
        "gamma": float(gamma),
        "vega": float(vega),
        "theta": float(theta)
    }

def implied_volatility(S, K, T, r, market_price):
    sigma_iv = 0.2
    for i in range(100):
        d1 = (np.log(S/K) + (r + sigma_iv**2/2)*T)/(sigma_iv*np.sqrt(T))
        d2 = d1 - sigma_iv*np.sqrt(T)
        price = S*norm.cdf(d1) - K*np.exp(-r*T)*norm.cdf(d2)
        vega = S*np.sqrt(T)*norm.pdf(d1)
        sigma_iv = sigma_iv - (price - market_price)/vega
    return float(sigma_iv)
