import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon,
  HomeIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  StarIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';
import logo from '../images/CvLogo.png';

/**
 * Navbar - Redesigned for beginner-friendly navigation
 * Includes: Coins, Learn, Quizzes, Portfolio, Tools
 */
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [quizzesDropdownOpen, setQuizzesDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/coins';
    }
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: 'Mynter', icon: HomeIcon },
    { path: '/learn', label: 'Lær', icon: BookOpenIcon, hasDropdown: true },
    { path: '/quizzes', label: 'Quizzer', icon: QuestionMarkCircleIcon, hasDropdown: true },
    { path: '/portfolio', label: 'Portefølje', icon: StarIcon },
    { path: '/tools', label: 'Verktøy', icon: WrenchScrewdriverIcon, hasDropdown: true },
  ];

  const learnCategories = [
    { path: '/learn/getting-started', label: 'Kom i gang' },
    { path: '/learn/wallets', label: 'Lommebøker' },
    { path: '/learn/trading', label: 'Handelsgrunnlag' },
    { path: '/learn/risks', label: 'Risiko & Sikkerhet' },
    { path: '/learn/blockchain', label: 'Blockchain-grunnlag' },
  ];

  const quizTypes = [
    { path: '/quizzes/beginner-check', label: 'Nybegynnersjekk' },
    { path: '/quizzes/wallet-readiness', label: 'Lommebokklarhet' },
    { path: '/quizzes/meme-coin-readiness', label: 'Meme-coin klarhet' },
    { path: '/quizzes/explorer-test', label: 'Blokkutforsker-test' },
  ];

  const toolsList = [
    { path: '/tools/converter', label: 'Priskonverter' },
    { path: '/tools/gas-tracker', label: 'Gass-sporing' },
    { path: '/tools/ath-atl', label: 'Høyeste/Laveste-sporing' },
    { path: '/tools/portfolio-calculator', label: 'Porteføljekalkulator' },
  ];

  return (
    <>
      <nav className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logo} alt="CoinView" className="h-8 rounded-lg" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.path}
                      className="relative"
                      onMouseEnter={() => {
                        if (item.path === '/learn') setLearnDropdownOpen(true);
                        if (item.path === '/quizzes') setQuizzesDropdownOpen(true);
                        if (item.path === '/tools') setToolsDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        setLearnDropdownOpen(false);
                        setQuizzesDropdownOpen(false);
                        setToolsDropdownOpen(false);
                      }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          active
                            ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                        <ChevronDownIcon className="h-3 w-3" />
                      </Link>
                      
                      {/* Dropdown Menu */}
                      {(item.path === '/learn' && learnDropdownOpen) && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">
                          {learnCategories.map((category) => (
                            <Link
                              key={category.path}
                              to={category.path}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              {category.label}
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      {(item.path === '/quizzes' && quizzesDropdownOpen) && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">
                          {quizTypes.map((quiz) => (
                            <Link
                              key={quiz.path}
                              to={quiz.path}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              {quiz.label}
                            </Link>
                          ))}
                        </div>
                      )}
                      
                      {(item.path === '/tools' && toolsDropdownOpen) && (
                        <div className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-2">
                          {toolsList.map((tool) => (
                            <Link
                              key={tool.path}
                              to={tool.path}
                              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              {tool.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              
              <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 lg:hidden">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                aria-label="Veksle meny"
              >
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <div key={item.path}>
                    <Link
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        active
                          ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                    
                    {/* Mobile sub-menu */}
                    {item.path === '/learn' && (
                      <div className="ml-12 mt-1 space-y-1">
                        {learnCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            {category.label}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {item.path === '/quizzes' && (
                      <div className="ml-12 mt-1 space-y-1">
                        {quizTypes.map((quiz) => (
                          <Link
                            key={quiz.path}
                            to={quiz.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            {quiz.label}
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {item.path === '/tools' && (
                      <div className="ml-12 mt-1 space-y-1">
                        {toolsList.map((tool) => (
                          <Link
                            key={tool.path}
                            to={tool.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          >
                            {tool.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
