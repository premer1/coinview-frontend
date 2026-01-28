import React, { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

/**
 * MetricCard - Compact, clean metric display
 * Smaller and easier to understand
 */
const MetricCard = ({ label, value, explanation, tooltip }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  if (!value && value !== 0) return null;
  
  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {label}
          </p>
          {tooltip && (
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onFocus={() => setShowTooltip(true)}
              onBlur={() => setShowTooltip(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Lær mer"
            >
              <QuestionMarkCircleIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      
      <p className="text-lg font-semibold text-gray-900 dark:text-white mb-0.5">
        {typeof value === 'number' 
          ? value.toLocaleString(undefined, { maximumFractionDigits: 2 })
          : value
        }
      </p>
      
      {explanation && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {explanation}
        </p>
      )}
      
      {showTooltip && tooltip && (
        <div className="absolute z-20 mt-2 p-2 bg-gray-900 dark:bg-gray-700 rounded-lg text-xs text-white shadow-lg max-w-xs">
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
