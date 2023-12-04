 import React, { useEffect } from 'react';

const RubicWidget = () => {
  useEffect(() => {
    // Load the Rubic widget script
    const script = document.createElement('script');
    script.src = 'https://widgets.rubic.exchange/iframe/bundle.min.js';
    document.body.appendChild(script);

    // Initialize the widget when the script has loaded
    script.onload = () => {
      initWidget();
    };
  }, []);

  const initWidget = () => {
    // Create the widget configuration
    const configuration = {
      from: 'ETH',
      to: '0x3330BFb7332cA23cd071631837dC289B09C33333',
      fromChain: 'ETH',
      toChain: 'ETH',
      amount: 1,
      iframe: 'flex',
      hideSelectionFrom: false,
      hideSelectionTo: true,
      tokenSearch: true,
      rubicLink: true,
      theme: 'dark',
      background: '#28372e',
      injectTokens: {
        eth: ['0x3330BFb7332cA23cd071631837dC289B09C33333'],
      },
      slippagePercent: {
        instantTrades: 2,
        crossChain: 5,
      },
    };

    // Prevent accidental changes to the configuration object
    Object.freeze(configuration);

    // Initialize the widget
    // eslint-disable-next-line no-undef
    rubicWidget.init(configuration);
  };

  return (
    <div>
      {/* The widget will be rendered inside this div element */}
      <div id="rubic-widget-root"></div>
    </div>
  );
};

export default RubicWidget;
 