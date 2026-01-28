import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

/**
 * CurrencySelector - Allows users to select between USD and NOK
 */
const CurrencySelector = ({ currency, onCurrencyChange }) => {
  const currencies = [
    { code: 'usd', symbol: 'USD', name: 'Amerikansk dollar' },
    { code: 'nok', symbol: 'NOK', name: 'Norsk krone' },
  ];

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol} - {curr.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};

export default CurrencySelector;
