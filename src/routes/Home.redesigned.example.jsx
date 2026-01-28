/**
 * Home Page - Redesigned Example
 * 
 * This is an example of how the Home page should look after redesign.
 * Replace the current Home.jsx with this structure.
 * 
 * Key changes:
 * - Card-based layout instead of table
 * - Welcome section for beginners
 * - Top 10 coins by default (not all 250)
 * - Clean, minimal design
 */

import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import GlobalStats from '../components/GlobalStats';

const Home = ({ coins }) => {
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);
  
  // Show top 10 by default, or all if "View All" clicked
  const displayCoins = showAll ? coins : coins?.slice(0, 10) || [];
  
  const handleToggleFavorite = (coinId) => {
    setFavorites(prev => 
      prev.includes(coinId)
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Welcome Section */}
      <section className="text-center py-12 px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white mb-4">
            Track crypto prices, simply
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            See what's happening with Bitcoin, Ethereum, and other cryptocurrencies. 
            No jargon, just clear information.
          </p>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar coins={coins} />
        </div>
      </section>
      
      {/* Top Coins Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Top Cryptocurrencies
            </h2>
            {!showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                View All →
              </button>
            )}
          </div>
          
          {/* Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCoins.map(coin => (
              <CoinCard
                key={coin.id}
                coin={coin}
                isFavorite={favorites.includes(coin.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
          
          {displayCoins.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                Loading cryptocurrencies...
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
