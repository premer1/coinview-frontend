import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-col items-center gap-4 text-center sm:text-left sm:flex-row sm:justify-between sm:items-start">
          <div>
            <Link to="/" className="font-fredoka text-lg font-semibold text-gray-900 dark:text-white">
              Din Krypto
            </Link>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Følg kryptopriser, lær grunnleggende og bruk verktøy. Ingen sjargong.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-1 text-sm">
            <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Mynter
            </Link>
            <Link to="/learn" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Lær
            </Link>
            <Link to="/quizzes" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Quizzer
            </Link>
            <Link to="/portfolio" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Portefølje
            </Link>
            <Link to="/tools" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Verktøy
            </Link>
            <Link to="/coin/bitcoin" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Bitcoin
            </Link>
            <Link to="/coin/ethereum" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              Ethereum
            </Link>
          </nav>
        </div>
        <p className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} Din Krypto. Prisdata fra CoinGecko.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
