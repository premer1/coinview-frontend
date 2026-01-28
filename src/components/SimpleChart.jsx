import React from 'react';
import { Sparklines, SparklinesLine } from 'react-sparklines';

/**
 * SimpleChart - Clean, minimal sparkline chart
 * Larger and clearer than the original tiny sparklines
 */
const SimpleChart = ({ data, isPositive = true }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-full w-full flex items-center justify-center text-gray-400 text-xs">
        Ingen data
      </div>
    );
  }

  // Use subtle colors - emerald for positive, gray for negative
  const lineColor = isPositive 
    ? '#10b981' // emerald-500
    : '#64748b'; // slate-500

  return (
    <div className="h-full w-full">
      <Sparklines data={data} width={200} height={64} margin={0}>
        <SparklinesLine 
          color={lineColor} 
          style={{ strokeWidth: 2, fill: 'none' }}
        />
      </Sparklines>
    </div>
  );
};

export default SimpleChart;
