import React, { useState, useContext } from 'react';
import { CurrencyContext } from '../context/CurrencyContext';
import CoinCard from '../components/CoinCard';
import { 
  StarIcon,
  BellIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

/**
 * Portfolio - Watchlist, favorites, and price alerts
 * Beginner-friendly portfolio management
 */
const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('favorites');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('coinview-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('coinview-alerts');
    return saved ? JSON.parse(saved) : [];
  });
  const [showAddAlert, setShowAddAlert] = useState(false);
  const [newAlert, setNewAlert] = useState({ coinId: '', type: 'above', price: '' });
  const { currency } = useContext(CurrencyContext);

  // Mock coins data - in real app, fetch from API
  const mockCoins = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', current_price: 45000, price_change_percentage_24h: 2.5, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', current_price: 3000, price_change_percentage_24h: -1.2, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png' },
  ];

  const favoriteCoins = mockCoins.filter(coin => favorites.includes(coin.id));

  const handleToggleFavorite = (coinId) => {
    const newFavorites = favorites.includes(coinId)
      ? favorites.filter(id => id !== coinId)
      : [...favorites, coinId];
    setFavorites(newFavorites);
    localStorage.setItem('coinview-favorites', JSON.stringify(newFavorites));
  };

  const handleAddAlert = () => {
    if (newAlert.coinId && newAlert.price) {
      const alert = {
        id: Date.now(),
        ...newAlert,
        price: parseFloat(newAlert.price),
        active: true
      };
      setAlerts([...alerts, alert]);
      localStorage.setItem('coinview-alerts', JSON.stringify([...alerts, alert]));
      setNewAlert({ coinId: '', type: 'above', price: '' });
      setShowAddAlert(false);
    }
  };

  const handleRemoveAlert = (alertId) => {
    const newAlerts = alerts.filter(alert => alert.id !== alertId);
    setAlerts(newAlerts);
    localStorage.setItem('coinview-alerts', JSON.stringify(newAlerts));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
            Portefølje
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Administrer favoritter, overvåkningsliste og prisvarsler på ett sted.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex gap-6">
            {[
              { id: 'favorites', label: 'Favoritter', icon: StarIcon },
              { id: 'alerts', label: 'Prisvarsler', icon: BellIcon }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div>
            {favorites.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center">
                <StarIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ingen favoritter ennå
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Begynn å legge til mynter i favorittene dine for å spore dem her.
                </p>
                <a
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  Bla gjennom mynter
                </a>
              </div>
            ) : (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Dine favorittmynter ({favoriteCoins.length})
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {favoriteCoins.map(coin => (
                    <div
                      key={coin.id}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <img
                            src={coin.image}
                            alt={coin.name}
                            className="h-10 w-10 rounded-full"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {coin.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {coin.symbol.toUpperCase()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900 dark:text-white">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: currency.toUpperCase()
                              }).format(coin.current_price)}
                            </div>
                            <div className={`text-sm ${
                              coin.price_change_percentage_24h >= 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-gray-500 dark:text-gray-400'
                            }`}>
                              {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleToggleFavorite(coin.id)}
                          className="ml-4 p-2 text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <StarIconSolid className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Prisvarsler ({alerts.length})
              </h2>
              <button
                onClick={() => setShowAddAlert(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
                Legg til varsel
              </button>
            </div>

            {showAddAlert && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Opprett prisvarsel
                  </h3>
                  <button
                    onClick={() => {
                      setShowAddAlert(false);
                      setNewAlert({ coinId: '', type: 'above', price: '' });
                    }}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Mynt
                    </label>
                    <input
                      type="text"
                      value={newAlert.coinId}
                      onChange={(e) => setNewAlert({ ...newAlert, coinId: e.target.value })}
                      placeholder="f.eks. bitcoin, ethereum"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Varsle når prisen går
                    </label>
                    <select
                      value={newAlert.type}
                      onChange={(e) => setNewAlert({ ...newAlert, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="above">Over</option>
                      <option value="below">Under</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Pris ({currency.toUpperCase()})
                    </label>
                    <input
                      type="number"
                      value={newAlert.price}
                      onChange={(e) => setNewAlert({ ...newAlert, price: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <button
                    onClick={handleAddAlert}
                    className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    Opprett varsel
                  </button>
                </div>
              </div>
            )}

            {alerts.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-12 text-center">
                <BellIcon className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Ingen varsler satt
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Opprett prisvarsler for å få varsel når mynter når målprisen din.
                </p>
                <button
                  onClick={() => setShowAddAlert(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                >
                  <PlusIcon className="h-5 w-5" />
                  Opprett ditt første varsel
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">
                          {alert.coinId.toUpperCase()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Varsle når prisen går {alert.type === 'above' ? 'over' : 'under'} {new Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: currency.toUpperCase()
                          }).format(alert.price)}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2 py-1 rounded ${
                          alert.active
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {alert.active ? 'Aktiv' : 'Inaktiv'}
                        </span>
                        <button
                          onClick={() => handleRemoveAlert(alert.id)}
                          className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
