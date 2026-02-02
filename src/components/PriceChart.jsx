import React from 'react';
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';

/**
 * PriceChart - Detailed price chart with labels, timeframes, and price indicators
 * Uses recharts for a professional, detailed visualization
 */
const PriceChart = ({ data, period, currentPrice, priceChange24h, currency = 'usd' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 md:h-96 flex items-center justify-center">
        <p className="text-gray-400 dark:text-gray-500">Laster diagramdata...</p>
      </div>
    );
  }

  // Format data for recharts
  const chartData = data.map((point, index) => ({
    time: point[0],
    price: point[1],
    timestamp: new Date(point[0]),
  }));

  // Format timestamp based on period
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    switch (period) {
      case '1d':
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '30d':
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      case '1y':
        return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      default:
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  // Format price for tooltip and display
  const formatPrice = (value) => {
    const symbol = currency === 'nok' ? 'kr' : '$';
    return `${symbol}${value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })}`;
  };

  // Calculate min/max for Y-axis
  const prices = chartData.map(d => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice;
  const yAxisMin = minPrice - priceRange * 0.1; // 10% padding
  const yAxisMax = maxPrice + priceRange * 0.1;

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            {formatPrice(payload[0].value)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {formatTime(label)}
          </p>
        </div>
      );
    }
    return null;
  };

  // Green for positive, red for negative
  const lineColor = priceChange24h > 0 ? '#10b981' : '#ef4444';

  return (
    <div className="w-full">
      {/* Price Stats */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Nåværende pris</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatPrice(currentPrice)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">24t endring</p>
          <p className={`text-xl font-semibold ${priceChange24h > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
            {priceChange24h > 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400">Periode</p>
          <p className="text-lg font-medium text-gray-900 dark:text-white">
            {period === '1d' ? '1 dag' : period === '7d' ? '7 dager' : period === '30d' ? '30 dager' : '1 år'}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 md:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-700"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tickFormatter={formatTime}
              stroke="#9ca3af"
              className="dark:stroke-gray-400"
              style={{ fontSize: '12px' }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[yAxisMin, yAxisMax]}
              tickFormatter={(value) => formatPrice(value)}
              stroke="#9ca3af"
              className="dark:stroke-gray-400"
              style={{ fontSize: '12px' }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={currentPrice}
              stroke={lineColor}
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={lineColor}
              strokeWidth={2}
              fill="url(#priceGradient)"
              dot={false}
              activeDot={{ r: 6, fill: lineColor, strokeWidth: 2, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Price Range Info */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-sm flex-wrap gap-2">
        <div>
          <span className="text-gray-500 dark:text-gray-400">Laveste i perioden: </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(minPrice)}
          </span>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Høyeste i perioden: </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <div>
          <span className="text-gray-500 dark:text-gray-400">Spenn: </span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatPrice(maxPrice - minPrice)} ({(((maxPrice - minPrice) / minPrice) * 100).toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
