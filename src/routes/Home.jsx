import React, { useState, useContext, useEffect } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import CurrencySelector from '../components/CurrencySelector';

/**
 * Home - Redesigned with card-based layout
 * Beginner-friendly, clean, minimal design
 */
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const Home = ({ coins, loading }) => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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

  const totalPages = Math.max(1, Math.ceil(filteredCoins.length / rowsPerPage));
  const displayCoins = filteredCoins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleRowsPerPageChange = (e) => {
    const value = Number(e.target.value);
    setRowsPerPage(value);
    setPage(0);
  };

  const handlePageChange = (newPage) => {
    setPage(Math.max(0, Math.min(newPage, totalPages - 1)));
  };

  // Reset to first page when search changes
  useEffect(() => {
    setPage(0);
  }, [searchQuery]);

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
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
            {searchQuery ? 'Søkeresultater' : 'Topp kryptovalutaer'}
          </h2>

          {/* Pagination - compact, top */}
          {!loading && filteredCoins.length > 0 && (
            <div className="max-w-4xl mx-auto mb-4 flex items-center justify-center gap-2 flex-wrap">
              <select
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {ROWS_PER_PAGE_OPTIONS.map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
              <span className="text-xs text-gray-500 dark:text-gray-400">per side</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">|</span>
              <div className="flex items-center gap-0.5 text-xs">
                {page > 0 && (
                  <>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      className="min-w-[1.5rem] px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {page}
                    </button>
                    <span className="px-0.5 text-gray-400">←</span>
                  </>
                )}
                <span className="min-w-[1.5rem] px-1.5 py-0.5 rounded bg-blue-600 dark:bg-blue-500 text-white font-medium text-center">
                  {page + 1}
                </span>
                {page < totalPages - 1 && (
                  <>
                    <span className="px-0.5 text-gray-400">→</span>
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      className="min-w-[1.5rem] px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      {page + 2}
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

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
