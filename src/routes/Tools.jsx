import React from 'react';
import { Link } from 'react-router-dom';
import CoinCalculator from '../components/CoinCalculator';
import { 
  CalculatorIcon,
  BoltIcon,
  ChartBarIcon,
  WalletIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

/**
 * Tools - Utility tools for crypto users
 * Clean grid layout with tool cards
 */
const Tools = () => {
  const tools = [
    {
      id: 'converter',
      title: 'Priskonverter',
      description: 'Konverter mellom kryptovalutaer og fiat-valutaer',
      icon: CalculatorIcon,
      color: 'blue',
      available: true,
      path: '/tools/converter'
    },
    {
      id: 'gas-tracker',
      title: 'Gass-sporing',
      description: 'Spor Ethereum gasspriser i sanntid',
      icon: BoltIcon,
      color: 'purple',
      available: false,
      path: '/tools/gas-tracker'
    },
    {
      id: 'ath-atl',
      title: 'Høyeste/Laveste-sporing',
      description: 'Spor høyeste og laveste priser for hvilken som helst mynt',
      icon: ChartBarIcon,
      color: 'emerald',
      available: false,
      path: '/tools/ath-atl'
    },
    {
      id: 'portfolio-calculator',
      title: 'Porteføljekalkulator',
      description: 'Beregn porteføljeverdien og ytelsen din',
      icon: WalletIcon,
      color: 'blue',
      available: false,
      path: '/tools/portfolio-calculator'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-gray-900 dark:text-white mb-4">
            Verktøy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Nyttige verktøy for å hjelpe deg med å navigere kryptoverdenen.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tools.map((tool) => {
            const Icon = tool.icon;
            const colorClasses = {
              blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
              purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400',
              emerald: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
            };

            if (tool.available && tool.id === 'converter') {
              return (
                <div
                  key={tool.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${colorClasses[tool.color]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {tool.title}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <CoinCalculator />
                </div>
              );
            }

            return (
              <div
                key={tool.id}
                className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 ${
                  !tool.available ? 'opacity-60' : 'hover:shadow-lg transition-shadow'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${colorClasses[tool.color]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {tool.title}
                      </h2>
                      {!tool.available && (
                        <span className="text-xs font-medium px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          Kommer snart
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {tool.description}
                    </p>
                    {tool.available ? (
                      <Link
                        to={tool.path}
                        className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
                      >
                        Åpne verktøy
                        <ArrowRightIcon className="h-4 w-4" />
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        Dette verktøyet vil være tilgjengelig snart
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Om disse verktøyene
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Disse verktøyene er designet for å hjelpe deg med å ta informerte beslutninger. De gir informasjon og beregninger, men gjør alltid din egen research (DYOR) før du tar finansielle beslutninger.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tools;
