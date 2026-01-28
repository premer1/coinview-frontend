import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

/**
 * SearchBar - Improved search with popular suggestions
 * More forgiving and helpful for beginners
 */
const SearchBar = ({ coins, onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  
  const popularCoins = ['Bitcoin', 'Ethereum', 'Solana', 'Cardano', 'Polygon'];
  
  // Filter coins based on search (more forgiving - matches name or symbol)
  const filteredCoins = (coins || []).filter(coin => {
    if (!searchText) return false;
    const search = searchText.toLowerCase();
    return (
      coin.name?.toLowerCase().includes(search) ||
      coin.symbol?.toLowerCase().includes(search) ||
      coin.id?.toLowerCase().includes(search)
    );
  }).slice(0, 8);
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setShowResults(value.length > 0);
    if (onSearch) onSearch(value);
  };
  
  const handlePopularClick = (coinName) => {
    const coin = coins?.find(c => 
      c.name.toLowerCase() === coinName.toLowerCase()
    );
    if (coin) {
      setSearchText('');
      setShowResults(false);
    }
  };
  
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => searchText && setShowResults(true)}
          placeholder="Søk etter Bitcoin, Ethereum eller hvilken som helst mynt..."
          className="w-full px-6 py-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <MagnifyingGlassIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      
      {/* Popular Suggestions */}
      {!searchText && (
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-500 dark:text-gray-400">Populære:</span>
          {popularCoins.map(coinName => {
            const coin = (coins || []).find(c =>
              c.name?.toLowerCase() === coinName.toLowerCase()
            );
            if (!coin) return null;
            
            return (
              <Link
                key={coin.id}
                to={`/coin/${coin.id}`}
                className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
              >
                {coinName}
              </Link>
            );
          })}
        </div>
      )}
      
      {/* Search Results Dropdown */}
      {showResults && searchText && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-96 overflow-y-auto">
          {filteredCoins.length > 0 ? (
            filteredCoins.map(coin => (
              <Link
                key={coin.id}
                to={`/coin/${coin.id}`}
                onClick={() => {
                  setSearchText('');
                  setShowResults(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <img 
                  src={coin.image} 
                  alt={coin.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {coin.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {coin.symbol?.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-white">
                    ${coin.current_price?.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm">Ingen mynter funnet</p>
              <p className="text-xs mt-1">Prøv å søke etter navn eller symbol</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
