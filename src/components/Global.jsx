import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


const Global = () => {
  const [global, setGlobal] = useState(null);

useEffect((async) => {

  
  const url = "https://api.coingecko.com/api/v3/global"

  const fetchData = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json.data);
      setGlobal(json.data)
    } catch (error) {
      console.log("error", error);
    }
    };

    fetchData();
},[]);
  return (
    
    <div className='border-b hidden sm:block dark:md:border-gray-600 md:border-gray-200 lg-block'>
      <div className='rounded-div border-none flex items-center justify-between h-12 sans-serif'>

        <div className='mr-3'>
          <span className='text-xs flex'>Coins:
            <p className='ml-0.5 text-blue-600'>{global?.active_cryptocurrencies.toLocaleString()}</p>                  
          </span>                                
        </div>
        
        <div className='mr-3'>
        <span className='text-xs flex'>Exchanges:
        <p className='ml-0.5 text-blue-600'>{global?.markets}</p>
        </span>   
        </div>

        <div className='mr-3'>
          <span className='text-xs flex'>Market Cap:
          <p className='ml-0.5 text-blue-600'>${global?.total_market_cap.usd.toLocaleString()}</p>
          <p className='ml-1 hidden sm:block'>{global?.market_cap_change_percentage_24h_usd > 0 ? (<p className='text-green-600'>{global?.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>) : (<p className='text-red-600'>{global?.market_cap_change_percentage_24h_usd.toFixed(2)}%</p>)}</p>
          </span>
        </div>

        <div className='mr-3 hidden sm:block'>
          <span className='text-xs flex'>24h Vol:
          <p className='ml-0.5 text-blue-600'>${global?.total_volume.usd.toLocaleString()}</p>
          </span>
        </div>

        <div className='mr-3 hidden lg:block'>
          <span className='text-xs flex'>Dominance:
          <p className='ml-0.5 text-blue-600'>BTC {global?.market_cap_percentage.btc.toFixed(1)}%</p>
          <p className='ml-2 text-blue-600'>ETH {global?.market_cap_percentage.eth.toFixed(1)}%</p>
          </span>
        </div>

        <div className='mr-3 hidden lg:block'>
          <a className='text-xs flex text-blue-600' href="https://etherscan.io/gastracker">GAS</a>
        </div>

      <div className='flex'>
      <Menu as="div" className="relative inline-block text-left">
      <div className='hidden lg:block'>
        <Menu.Button className="flex items-center h-5 w-15 border-none justify-center border-gray-300 dark:text-white px-4 py-2 text-xs font-xs shadow-sm">
          EN
          <ChevronDownIcon className="-mr-1 ml-2 h-3 w-3" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute border z-10 mt-0.5 h-30 w-36 origin-top-right bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col m-3">
            <Menu.Item className='hover:bg-gray-900 mb-0.5'>
              {({ active }) => (
               <Link to='/'>Coins</Link>
              )}
            </Menu.Item>
            <Menu.Item className='hover:bg-gray-900 mb-0.5'>
              {({ active }) => (
              <Link>Exchanges</Link>
              )}
            </Menu.Item>
            <Menu.Item className='hover:bg-gray-900'>
              {({ active }) => (
                <Link>NFT</Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    <Menu as="div" className="relative inline-block text-left">
      <div className='hidden lg:block'>
        <Menu.Button className="flex items-center h-5 w-15 border-none justify-center border-gray-300 dark:text-white px-4 py-2 text-xs font-xs shadow-sm">
          USD
          <ChevronDownIcon className="-mr-1 ml-2 h-3 w-3" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute border z-10 mt-0.5 h-30 w-36 origin-top-right bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col m-3">
            <Menu.Item className='hover:bg-gray-900 mb-0.5'>
              {({ active }) => (
               <Link to='/'>Coins</Link>
              )}
            </Menu.Item>
            <Menu.Item className='hover:bg-gray-900 mb-0.5'>
              {({ active }) => (
              <Link>Exchanges</Link>
              )}
            </Menu.Item>
            <Menu.Item className='hover:bg-gray-900'>
              {({ active }) => (
                <Link>NFT</Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
      </div>
  
      </div>
    </div>
    
  )
}

export default Global
