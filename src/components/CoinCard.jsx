import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { CurrencyContext } from '../context/CurrencyContext';
import TrendIndicator from './TrendIndicator';
import SimpleChart from './SimpleChart';

/**
 * CoinCard - Card layout for a single coin
 */
const CoinCard = ({ coin, isFavorite, onToggleFavorite }) => {
  const { currency } = useContext(CurrencyContext);

  if (!coin) return null;

  const formatPrice = (price) => {
    if (price == null) return 'N/A';
    const symbol = currency === 'nok' ? 'kr' : '$';
    return `${symbol}${Number(price).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    })}`;
  };

  return (
    <Link to={`/coin/${coin.id}`} className="block">
      <div className="group bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 overflow-hidden">
        <div className="flex items-center gap-3 min-w-0">
          {/* Left: logo + name – kan krympes, navn trunkeres */}
          <div className="flex items-center gap-3 min-w-0 flex-shrink">
            {coin.image ? (
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 rounded-full flex-shrink-0"
              />
            ) : (
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium flex-shrink-0">
                {coin.symbol?.slice(0, 2).toUpperCase()}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="font-semibold text-base text-gray-900 dark:text-white truncate" title={coin.name}>
                {coin.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {coin.symbol?.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Midten: pris + trend – tar resten, kan krympes */}
          <div className="flex-1 min-w-0 text-right flex flex-col items-end justify-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white truncate max-w-full">
              {formatPrice(coin.current_price)}
            </p>
            <div className="flex items-center justify-end gap-2 mt-0.5">
              <TrendIndicator value={coin.price_change_percentage_24h} />
            </div>
          </div>

          {/* Høyre: graf + stjerne – fast plass, stjernen alltid synlig */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {coin.sparkline_in_7d?.price && (
              <div className="w-16 sm:w-20 h-10 opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 overflow-hidden">
                <SimpleChart
                  data={coin.sparkline_in_7d.price}
                  isPositive={coin.price_change_percentage_24h > 0}
                />
              </div>
            )}

            {onToggleFavorite && (
              <span className="w-8 h-8 flex items-center justify-center flex-shrink-0" aria-hidden="true">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onToggleFavorite(coin.id);
                  }}
                  className="text-gray-300 hover:text-yellow-400 transition-colors p-1 rounded touch-manipulation"
                  aria-label={isFavorite ? 'Fjern fra favoritter' : 'Legg til i favoritter'}
                >
                  {isFavorite ? (
                    <StarIconSolid className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <StarIcon className="w-4 h-4" />
                  )}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CoinCard;
