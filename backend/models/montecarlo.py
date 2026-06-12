import numpy as np

def run_monte_carlo(S, K, T, r, sigma, n_simulations=500, steps=252):
    dt = T / steps
    paths = []
    
    # Generate paths using antithetic variates
    for _ in range(n_simulations // 2):
        prices1 = [S]
        prices2 = [S]
        for _ in range(steps):
            shock = np.random.normal(0, 1)
            shock_antithetic = -shock
            price1 = prices1[-1] * np.exp((r - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * shock)
            price2 = prices2[-1] * np.exp((r - 0.5 * sigma**2) * dt + sigma * np.sqrt(dt) * shock_antithetic)
            prices1.append(price1)
            prices2.append(price2)
        paths.append(prices1)
        paths.append(prices2)
        
    if len(paths) < n_simulations:
        paths.append(paths[-1])
        
    final_prices = np.array([path[-1] for path in paths])
    
    call_payoffs = np.maximum(final_prices - K, 0)
    put_payoffs = np.maximum(K - final_prices, 0)
    
    mc_call_price = np.exp(-r * T) * np.mean(call_payoffs)
    mc_put_price = np.exp(-r * T) * np.mean(put_payoffs)
    
    std_error = np.std(call_payoffs) / np.sqrt(len(final_prices))
    ci_lower = mc_call_price - 1.96 * std_error
    ci_upper = mc_call_price + 1.96 * std_error
    
    prob_above_strike = np.mean(final_prices > K)
    
    # Format paths for frontend
    formatted_paths = []
    for idx, path in enumerate(paths[:100]): # Limit to 100 paths for UI performance
        formatted_paths.append(path)
        
    # Convergence
    mc_convergence = []
    for i in range(50, len(final_prices), 50):
        temp_payoffs = np.maximum(final_prices[:i] - K, 0)
        temp_price = np.exp(-r*T) * np.mean(temp_payoffs)
        mc_convergence.append({"simulations": i, "price": float(temp_price)})
        
    # Histogram distribution
    hist, bins = np.histogram(final_prices, bins=40)
    distribution = [{"price": float(bins[i]), "count": int(hist[i])} for i in range(len(hist))]
    
    return {
        "call_price": float(mc_call_price),
        "put_price": float(mc_put_price),
        "ci_lower": float(ci_lower),
        "ci_upper": float(ci_upper),
        "prob_above_strike": float(prob_above_strike),
        "average_final_price": float(np.mean(final_prices)),
        "paths": formatted_paths,
        "convergence": mc_convergence,
        "distribution": distribution
    }
