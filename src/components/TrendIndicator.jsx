import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

/**
 * TrendIndicator - Visual indicator for price changes
 * Uses subtle colors and icons instead of aggressive red/green
 */
const TrendIndicator = ({ value }) => {
  if (value === null || value === undefined) return null;
  
  const isPositive = value > 0;
  const absValue = Math.abs(value);
  
  // Green for positive, red for negative
  const colorClass = isPositive 
    ? 'text-emerald-600 dark:text-emerald-400' 
    : 'text-red-600 dark:text-red-400';
  
  return (
    <div className={`flex items-center gap-1 ${colorClass}`}>
      {isPositive ? (
        <ArrowUpIcon className="w-4 h-4" />
      ) : (
        <ArrowDownIcon className="w-4 h-4" />
      )}
      <span className="font-medium text-sm">
        {absValue.toFixed(2)}%
      </span>
    </div>
  );
};

export default TrendIndicator;
