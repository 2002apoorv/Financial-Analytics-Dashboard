import numpy as np
from arch import arch_model

def get_garch_volatility(data):
    returns = np.log(data["Close"] / data["Close"].shift(1)).dropna()
    model = arch_model(returns * 100, vol="Garch", p=1, q=1)
    result = model.fit(disp="off")
    
    forecast = result.forecast(horizon=1)
    predicted_vol_daily = np.sqrt(forecast.variance.values[-1, :][0]) / 100
    sigma = predicted_vol_daily * np.sqrt(252)
    
    # Historical vol
    historical_vol = result.conditional_volatility
    vol_path = [{"time": str(idx.date()), "volatility": float(v)} for idx, v in zip(historical_vol.index, historical_vol)]
    
    return float(sigma), vol_path
