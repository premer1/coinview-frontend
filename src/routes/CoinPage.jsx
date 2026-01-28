import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { CurrencyContext } from '../context/CurrencyContext';
import TrendIndicator from '../components/TrendIndicator';
import MetricCard from '../components/MetricCard';
import PriceChart from '../components/PriceChart';
import CoinCalculator from '../components/CoinCalculator';
import CurrencySelector from '../components/CurrencySelector';
import DOMPurify from 'dompurify';

/**
 * CoinPage - Redesigned with price-focused, beginner-friendly layout
 * Large price display, detailed chart with timeframes, clear metrics with explanations
 * Supports USD and NOK currency selection
 */
const CoinPage = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('7d');
  const { currency, setCurrency } = useContext(CurrencyContext);
  const params = useParams();

  // Helper function to format price with currency symbol
  const formatPrice = (price) => {
    if (!price && price !== 0) return 'N/A';
    const symbol = currency === 'nok' ? 'kr' : '$';
    return `${symbol}${price.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: price < 1 ? 6 : 2,
    })}`;
  };

  // Helper function to get price from market data
  const getPrice = (marketData, key) => {
    if (!marketData) return 0;
    return marketData[key]?.[currency] || marketData[key]?.usd || 0;
  };

  // Fetch coin data
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        setLoading(true);
        const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;
        const response = await axios.get(url);
        setCoin(response.data);
      } catch (error) {
        console.error('Error fetching coin:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.coinId]);

  // Fetch chart data when period or currency changes
  useEffect(() => {
    const fetchChartData = async () => {
      if (!params.coinId) return;

      try {
        setChartLoading(true);
        // Map period to days
        const daysMap = {
          '1d': 1,
          '7d': 7,
          '30d': 30,
          '1y': 365,
        };
        const days = daysMap[chartPeriod] || 7;

        const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=${currency}&days=${days}`;
        const response = await axios.get(url);
        
        // Format data: [timestamp, price]
        const prices = response.data.prices || [];
        setChartData(prices);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData([]);
      } finally {
        setChartLoading(false);
      }
    };

    fetchChartData();
  }, [params.coinId, chartPeriod, currency]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Laster...</p>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Mynt ikke funnet</p>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Tilbake til hjem
          </Link>
        </div>
      </div>
    );
  }

  const marketData = coin.market_data || {};
  const priceChange24h = marketData.price_change_percentage_24h_in_currency?.[currency] || 
                         marketData.price_change_percentage_24h_in_currency?.usd || 0;
  const currentPrice = getPrice(marketData, 'current_price');
  const currencyLabel = currency === 'nok' ? 'NOK' : 'USD';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button and Currency Selector */}
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Tilbake til alle mynter</span>
          </Link>
          <CurrencySelector currency={currency} onCurrencyChange={setCurrency} />
        </div>

        {/* Price Hero Section */}
        <section className="text-center py-12 border-b border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <img
              src={coin.image?.large}
              alt={coin.name}
              className="w-16 h-16 rounded-full"
            />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white">
                {coin.name}
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                {coin.symbol?.toUpperCase()} / {currencyLabel}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-4">
              {formatPrice(currentPrice)}
            </p>
            <div className="flex items-center justify-center gap-3">
              <TrendIndicator value={priceChange24h} />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {priceChange24h > 0 ? 'opp' : 'ned'} i dag
              </span>
            </div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-8 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            {/* Period Selector */}
            <div className="flex gap-2 mb-6">
              {[
                { label: '1 dag', value: '1d' },
                { label: '7 dager', value: '7d' },
                { label: '30 dager', value: '30d' },
                { label: '1 år', value: '1y' },
              ].map(period => (
                <button
                  key={period.value}
                  onClick={() => setChartPeriod(period.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    chartPeriod === period.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {/* Detailed Chart */}
            {chartLoading ? (
              <div className="h-64 md:h-96 flex items-center justify-center">
                <p className="text-gray-400 dark:text-gray-500">Laster diagramdata...</p>
              </div>
            ) : (
              <PriceChart
                data={chartData}
                period={chartPeriod}
                currentPrice={currentPrice}
                priceChange24h={priceChange24h}
                currency={currency}
              />
            )}
          </div>
        </section>

        {/* Key Metrics and Calculator */}
        <section className="mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Calculator */}
            <div className="lg:col-span-1">
              <CoinCalculator 
                coinSymbol={coin.symbol} 
                currentPrice={currentPrice}
                currency={currency}
              />
            </div>
            
            {/* Key Metrics - Compact Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Viktig informasjon
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MetricCard
                  label="Markedsverdi"
                  value={formatPrice(getPrice(marketData, 'market_cap'))}
                  explanation="Total verdi"
                  tooltip="Total verdi av alle mynter i sirkulasjon"
                />
                <MetricCard
                  label="24t volum"
                  value={formatPrice(getPrice(marketData, 'total_volume'))}
                  explanation="Handlet i dag"
                  tooltip="Beløp handlet de siste 24 timene"
                />
                <MetricCard
                  label="Tilbud"
                  value={marketData.circulating_supply?.toLocaleString()}
                  explanation="I sirkulasjon"
                  tooltip="Mynter som er tilgjengelige nå"
                />
                <MetricCard
                  label="Høyeste noen gang"
                  value={formatPrice(getPrice(marketData, 'ath'))}
                  explanation="Høyeste pris"
                  tooltip="Høyeste pris som noen gang er nådd"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Expandable Advanced Section */}
        <details className="mb-8">
          <summary className="cursor-pointer text-base font-semibold text-gray-900 dark:text-white py-3 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Flere detaljer
          </summary>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
            <MetricCard
              label="Totalt tilbud"
              value={marketData.total_supply?.toLocaleString() || 'N/A'}
              explanation="Alle mynter"
              tooltip="Alle mynter som finnes eller vil eksistere"
            />
            <MetricCard
              label="Maks tilbud"
              value={marketData.max_supply?.toLocaleString() || '∞'}
              explanation="Maksimal grense"
              tooltip="Maksimalt antall mynter som kan eksistere"
            />
            <MetricCard
              label="FDV"
              value={formatPrice(getPrice(marketData, 'fully_diluted_valuation'))}
              explanation="Fullt utvannet verdi"
              tooltip="Markedsverdi hvis alle mynter var i sirkulasjon"
            />
            <MetricCard
              label="Laveste noen gang"
              value={formatPrice(getPrice(marketData, 'atl'))}
              explanation="Laveste pris"
              tooltip="Laveste pris som noen gang er nådd"
            />
          </div>
        </details>

        {/* About Section - Simplified */}
        {coin.description?.en && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Om {coin.name}
            </h2>
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(coin.description.en.substring(0, 500) + '...')
              }}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default CoinPage;
