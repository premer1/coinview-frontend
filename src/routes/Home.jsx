import React, { useState, useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import CurrencySelector from '../components/CurrencySelector';

/**
 * Home - Redesigned with card-based layout
 * Beginner-friendly, clean, minimal design
 */
const Home = ({ coins, loading }) => {
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currency, setCurrency } = useContext(CurrencyContext);

  // Filter coins based on search
  const filteredCoins = coins?.filter(coin => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      coin.name?.toLowerCase().includes(query) ||
      coin.symbol?.toLowerCase().includes(query) ||
      coin.id?.toLowerCase().includes(query)
    );
  }) || [];

  // Show top 10 by default, or all if "View All" clicked
  const displayCoins = showAll ? filteredCoins : filteredCoins.slice(0, 10);

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
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-white">
              Følg kryptopriser, enkelt
            </h1>
            <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Se hva som skjer med Bitcoin, Ethereum og andre kryptovalutaer.
            Ingen sjargong, bare tydelig informasjon.
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <SearchBar coins={coins} onSearch={setSearchQuery} />
        </div>
      </section>

      {/* Top Coins Section */}
      <section className="py-8 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {searchQuery ? 'Søkeresultater' : 'Topp kryptovalutaer'}
            </h2>
            {!showAll && !searchQuery && filteredCoins.length > 10 && (
              <button
                onClick={() => setShowAll(true)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                Vis alle →
              </button>
            )}
          </div>

          {/* Card Grid - Single column */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">Laster kryptovalutaer...</p>
            </div>
          ) : displayCoins.length > 0 ? (
            <div className="grid grid-cols-1 gap-3 max-w-4xl mx-auto">
              {displayCoins.map(coin => (
                <CoinCard
                  key={coin.id}
                  coin={coin}
                  isFavorite={favorites.includes(coin.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {searchQuery ? 'Ingen mynter funnet. Prøv et annet søk.' : 'Ingen kryptovalutaer tilgjengelig.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
