import React, { useState, useEffect, createContext } from 'react';

const getInitialCurrency = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedCurrency = window.localStorage.getItem('currency');
    if (storedCurrency === 'usd' || storedCurrency === 'nok') {
      return storedCurrency;
    }
  }
  return 'usd';
};

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(getInitialCurrency);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};
