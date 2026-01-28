import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { CurrencyContext } from '../context/CurrencyContext';
import TrendIndicator from './TrendIndicator';
import SimpleChart from './SimpleChart';

/**
 * CoinCard - Modern, minimal card design for displaying cryptocurrency data
 * Replaces the dense table row with a beginner-friendly card layout
 */
const CoinCard = ({ coin, isFavorite, onToggleFavorite }) => {
  const { currency } = useContext(CurrencyContext);
  
  if (!coin) return null;

  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    const symbol = currency === 'nok' ? 'kr' : '$';
    return `${symbol}${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    })}`;
  };

  return (
    <Link to={`/coin/${coin.id}`} className="block">
      <div className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600">
        {/* Horizontal layout: Coin info, Price, Chart */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Coin info */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <img 
              src={coin.image} 
              alt={coin.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h3 className="font-semibold text-base text-gray-900 dark:text-white">
                {coin.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {coin.symbol?.toUpperCase()}
              </p>
            </div>
          </div>
          
          {/* Center: Price and trend */}
          <div className="flex-1 text-right">
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatPrice(coin.current_price)}
            </p>
            <div className="flex items-center justify-end gap-2 mt-0.5">
              <TrendIndicator value={coin.price_change_percentage_24h} />
            </div>
          </div>
          
          {/* Right: Chart and favorite */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mini Chart */}
            {coin.sparkline_in_7d?.price && (
              <div className="w-20 h-10 opacity-60 group-hover:opacity-100 transition-opacity">
                <SimpleChart 
                  data={coin.sparkline_in_7d.price}
                  isPositive={coin.price_change_percentage_24h > 0}
                />
              </div>
            )}
            
            {/* Favorite button */}
            {onToggleFavorite && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onToggleFavorite(coin.id);
                }}
                className="text-gray-300 hover:text-yellow-400 transition-colors p-1"
                aria-label={isFavorite ? 'Fjern fra favoritter' : 'Legg til i favoritter'}
              >
                {isFavorite ? (
                  <StarIconSolid className="w-4 h-4 text-yellow-400" />
                ) : (
                  <StarIcon className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
