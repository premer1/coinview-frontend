/**
 * Coin Detail Page - Redesigned Example
 * 
 * This is an example of how the CoinPage should look after redesign.
 * Replace the current CoinPage.jsx with this structure.
 * 
 * Key changes:
 * - Large, prominent price display
 * - Chart is full-width and prominent
 * - Metrics have explanations
 * - Advanced data is hidden by default
 * - Simplified navigation
 */

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import TrendIndicator from '../components/TrendIndicator';
import MetricCard from '../components/MetricCard';
import DOMPurify from 'dompurify';

const CoinPage = () => {
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartPeriod, setChartPeriod] = useState('7d');
  const params = useParams();
  
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
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  }
  
  if (!coin) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400 mb-4">Coin not found</p>
          <Link to="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to home
          </Link>
        </div>
      </div>
    );
  }
  
  const marketData = coin.market_data || {};
  const priceChange24h = marketData.price_change_percentage_24h_in_currency?.usd || 0;
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to all coins</span>
        </Link>
        
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
                {coin.symbol?.toUpperCase()} / USD
              </p>
            </div>
          </div>
          
          <div className="mt-6">
            <p className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white mb-4">
              ${marketData.current_price?.usd.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: marketData.current_price?.usd < 1 ? 6 : 2,
              })}
            </p>
            <div className="flex items-center justify-center gap-3">
              <TrendIndicator value={priceChange24h} />
              <span className="text-lg text-gray-600 dark:text-gray-400">
                {priceChange24h > 0 ? 'up' : 'down'} today
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
                { label: '1 Day', value: '1d' },
                { label: '7 Days', value: '7d' },
                { label: '30 Days', value: '30d' },
                { label: '1 Year', value: '1y' },
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
            
            {/* Chart Placeholder - Replace with actual chart component */}
            <div className="h-64 md:h-96 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <p className="text-gray-400 dark:text-gray-500">
                Chart component would go here
              </p>
            </div>
          </div>
        </section>
        
        {/* Key Metrics */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Key Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MetricCard
              label="Market Cap"
              value={`$${marketData.market_cap?.usd.toLocaleString()}`}
              explanation="Total value of all coins"
              tooltip="If you added up the value of every single coin in circulation, this is what you'd get. It's like the total market value of a company."
            />
            <MetricCard
              label="24h Volume"
              value={`$${marketData.total_volume?.usd.toLocaleString()}`}
              explanation="Traded in the last 24 hours"
              tooltip="This is how much money people moved buying and selling this coin in the past day. Higher volume usually means more activity."
            />
            <MetricCard
              label="Circulating Supply"
              value={marketData.circulating_supply?.toLocaleString()}
              explanation="Coins currently available"
              tooltip="This is how many coins are currently in circulation and available to trade. It doesn't include coins that are locked or not yet released."
            />
            <MetricCard
              label="All-Time High"
              value={`$${marketData.ath?.usd.toLocaleString()}`}
              explanation="Highest price ever reached"
              tooltip="The most expensive this coin has ever been. This helps you understand if the current price is high or low compared to history."
            />
          </div>
        </section>
        
        {/* Expandable Advanced Section */}
        <details className="mb-8">
          <summary className="cursor-pointer text-xl font-semibold text-gray-900 dark:text-white py-4 border-b border-gray-200 dark:border-gray-700 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            More Details
          </summary>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <MetricCard
              label="Total Supply"
              value={marketData.total_supply?.toLocaleString()}
              explanation="All coins that exist or will exist"
              tooltip="This includes all coins that have been created, even if they're not currently available for trading."
            />
            <MetricCard
              label="Max Supply"
              value={marketData.max_supply?.toLocaleString() || '∞'}
              explanation="Maximum coins that can ever exist"
              tooltip="Some cryptocurrencies have a limit on how many coins can ever be created. Others have no limit (shown as ∞)."
            />
            <MetricCard
              label="Fully Diluted Valuation"
              value={`$${marketData.fully_diluted_valuation?.usd.toLocaleString()}`}
              explanation="Value if all coins were in circulation"
              tooltip="This is what the market cap would be if all coins (including future ones) were already in circulation at the current price."
            />
            <MetricCard
              label="All-Time Low"
              value={`$${marketData.atl?.usd.toLocaleString()}`}
              explanation="Lowest price ever reached"
              tooltip="The cheapest this coin has ever been. Compare this to the current price to see how much it has grown."
            />
          </div>
        </details>
        
        {/* About Section - Simplified */}
        {coin.description?.en && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              About {coin.name}
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
