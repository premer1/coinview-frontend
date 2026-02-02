import React, { useState, useEffect, useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';

/**
 * Global - Simplified global market statistics
 * Shows only essential metrics in a clean, minimal bar
 */
const Global = () => {
  const [global, setGlobal] = useState(null);
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    const url = "https://api.coingecko.com/api/v3/global";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setGlobal(json.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  if (!global) return null;

  const formatPrice = (price) => {
    if (!price) return 'N/A';
    const value = price[currency] || price.usd || 0;
    const symbol = currency === 'nok' ? 'kr' : '$';
    return `${symbol}${value.toLocaleString()}`;
  };

  return (
    <div className="hidden md:block bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-6 md:gap-8 text-sm flex-wrap">
          <div>
            <span className="text-gray-600 dark:text-gray-400">Market Cap: </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatPrice(global.total_market_cap)}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">24h Vol: </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {formatPrice(global.total_volume)}
            </span>
          </div>
          <div>
            <span className="text-gray-600 dark:text-gray-400">BTC Dominance: </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {global.market_cap_percentage?.btc.toFixed(1)}%
            </span>
          </div>
          <div className="hidden lg:block">
            <span className="text-gray-600 dark:text-gray-400">ETH Dominance: </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {global.market_cap_percentage?.eth.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Global;
