import React, { useEffect, useState, useContext } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "./context/ThemeContext";
import { CurrencyProvider, CurrencyContext } from "./context/CurrencyContext";
import Home from "./routes/Home";
import CoinPage from './routes/CoinPage';
import Learn from './routes/Learn';
import Quizzes from './routes/Quizzes';
import Quiz from './routes/Quiz';
import Portfolio from './routes/Portfolio';
import Tools from './routes/Tools';
import axios from 'axios';
import Global from "./components/Global";
import Footer from "./components/Footer";

/**
 * AppContent - Inner component that can access CurrencyContext
 */
function AppContent() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true);
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=250&page=1&sparkline=true`;
        const response = await axios.get(url);
        setCoins(response.data);
      } catch (error) {
        console.error('Error fetching coins:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [currency]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Global />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coins={coins} loading={loading} />} />
        <Route path="/coins" element={<Home coins={coins} loading={loading} />} />
        <Route path="/coin/:coinId" element={<CoinPage />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:category" element={<Learn />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quizzes/:quizType" element={<Quiz />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/:toolId" element={<Tools />} />
      </Routes>
      <Footer />
    </div>
  );
}

/**
 * App - Main application component
 * Simplified structure with clean routing
 */
function App() {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <AppContent />
      </CurrencyProvider>
    </ThemeProvider>
  );
}

export default App;
