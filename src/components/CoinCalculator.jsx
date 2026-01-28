import React, { useState } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

/**
 * CoinCalculator - Simple calculator to convert coin amount to selected currency
 * x BTC -> USD/NOK (or any coin)
 */
const CoinCalculator = ({ coinSymbol, currentPrice, currency = 'usd' }) => {
  const [coinAmount, setCoinAmount] = useState('');
  const [currencyAmount, setCurrencyAmount] = useState('');

  const currencyLabel = currency === 'nok' ? 'NOK' : 'USD';

  const handleCoinChange = (e) => {
    const value = e.target.value;
    setCoinAmount(value);
    if (value && !isNaN(value) && currentPrice) {
      const converted = parseFloat(value) * currentPrice;
      setCurrencyAmount(converted.toFixed(2));
    } else {
      setCurrencyAmount('');
    }
  };

  const handleCurrencyChange = (e) => {
    const value = e.target.value;
    setCurrencyAmount(value);
    if (value && !isNaN(value) && currentPrice) {
      const coins = parseFloat(value) / currentPrice;
      setCoinAmount(coins.toFixed(8));
    } else {
      setCoinAmount('');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
        Kalkulator
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
        Konverter {coinSymbol?.toUpperCase()} til {currencyLabel}
      </p>
      
      <div className="space-y-3">
        {/* Coin Input */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {coinSymbol?.toUpperCase()}
          </label>
          <input
            type="number"
            value={coinAmount}
            onChange={handleCoinChange}
            placeholder="0.00"
            step="any"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Divider */}
        <div className="flex justify-center">
          <div className="w-full border-t border-gray-200 dark:border-gray-700 relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-2.5 bg-white dark:bg-gray-800 px-2">
              <ArrowsRightLeftIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Currency Input */}
        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
            {currencyLabel}
          </label>
          <input
            type="number"
            value={currencyAmount}
            onChange={handleCurrencyChange}
            placeholder="0.00"
            step="any"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {currentPrice && (
        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            1 {coinSymbol?.toUpperCase()} = {currency === 'nok' ? 'kr' : '$'}{currentPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </p>
        </div>
      )}
    </div>
  );
};

export default CoinCalculator;
