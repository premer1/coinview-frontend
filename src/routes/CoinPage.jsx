
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import {FaTwitter, FaFacebook, FaReddit, FaTelegram, FaSync, FaCoins, FaCopy, FaPeopleArrows, FaExternalLinkSquareAlt } from 'react-icons/fa'
import {  AiOutlineBell, AiOutlineShareAlt } from 'react-icons/ai'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import RubicWidget from '../components/RubicWidget'







const CoinPage = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // kopier teksten til utklippstavlen
    navigator.clipboard.writeText(`${coin.name}`);

    // endre state-variabelen til å være `true`
    setIsCopied(true);

    setTimeout(() => setIsCopied(false), 1500);
    
  };
  
  const [showInfo, setShowInfo] = useState(false)
  
  const [coin, setCoin] = useState({})
  const params = useParams()

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`

  useEffect(()=> {
    axios.get(url).then((response) => {
      setCoin(response.data)
    })
  },[url])

  
  return (
    
    <div className='rounded-div border-none my-12 py-12'>      
      <span className='rank-btn dark:bg-blue-900 bg-slate-200 w-20 px-2 rounded-md'>Rank # {coin.market_cap_rank}</span>
      <div className='flex py-8'>
        <img className='w-12 h-12 mr-8' src={coin.image?.large} alt="/" />
        <div>          
          <p className='text-xl font-bold'>{coin?.name}</p>                            
          {coin.market_data?.current_price ? <h1 className='font-bold'>${coin.market_data.current_price.usd.toLocaleString()}</h1> : null}
          <p>({coin.symbol?.toUpperCase()} / USD)</p>
        </div>
        <div className='grid grid-cols-3 items-end ml-5'>
            
            <Menu as="div" className="relative text-left hidden sm:block">
          <div>
          {isCopied && <p className='flex justify-center'> Copied!</p>}
            <Menu.Button   onClick={handleCopy} className="inline-flex border-none w-full justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">            
            Contract Address            
            <FaCopy className='flex justify-center items-center m-auto ml-2'/>                    
            </Menu.Button>                        
          </div> 
        </Menu>
    
        <Menu as="div" className="relative ml-5 hidden sm:block text-left">
          <div>
            <Menu.Button className="inline-flex border-none justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              Website
              <FaExternalLinkSquareAlt className='flex justify-center items-center m-auto ml-2'/>
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
            <Menu.Items className="absolute border rounded-b-lg z-10 h-30 w-36 origin-top-right dark:bg-black bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col m-3">
                <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
                  {({ active }) => (
                   <a target='blank' href="https://vg.no">Vg</a>
                  )}
                </Menu.Item>
                <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
                  {({ active }) => (
                  <Link>Exchanges</Link>
                  )}
                </Menu.Item>
                <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100'>
                  {({ active }) => (
                    <Link>NFT</Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative ml-5 hidden sm:block text-left">
          <div>
            <Menu.Button className="inline-flex border-none justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
              Social
              <FaPeopleArrows className='flex justify-center items-center m-auto ml-2'/>
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
            <Menu.Items className="absolute border rounded-b-lg z-10 h-30 w-36 origin-top-right dark:bg-gray-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col m-3">
              <div className='flex flex-col items-center'> 
              <a className='flex' href="https://vg.no">Twitter <FaTwitter className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Facebook <FaFacebook className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Telegram <FaTelegram className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Reddit <FaReddit className='mb-5 ml-3 mt-1' /></a>
                
              </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <Menu as="div" className="relative ml-5 hidden sm:block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center rounded-full dark:text-white px-2 text-sm font-medium">
              Share
              <AiOutlineShareAlt className='flex justify-center items-center m-auto ml-2'/>
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
            <Menu.Items className="absolute border rounded-b-lg z-10 h-30 w-36 origin-top-right dark:bg-gray-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col m-3">
              <div className='flex flex-col items-center'> 
              <a className='flex' href="https://vg.no">Twitter <FaTwitter className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Facebook <FaFacebook className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Telegram <FaTelegram className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Reddit <FaReddit className='mb-5 ml-3 mt-1' /></a>
                
              </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative ml-5 hidden sm:block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center rounded-full dark:text-white px-2 text-sm font-medium">
              Price Alert
              <AiOutlineBell className='flex justify-center items-center m-auto ml-2'/>
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
            <Menu.Items className="absolute border rounded-b-lg z-10 h-30 w-36 origin-top-right dark:bg-gray-800 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="flex flex-col m-3">
              <div className='flex flex-col items-center'> 
              <a className='flex' href="https://vg.no">Twitter <FaTwitter className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Facebook <FaFacebook className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Telegram <FaTelegram className='mb-5 ml-3 mt-1' /></a>
              <a className='flex' href="https://vg.no">Reddit <FaReddit className='mb-5 ml-3 mt-1' /></a>
                
              </div>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
        <Menu as="div" className="relative ml-5 hidden sm:block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center rounded-full dark:text-white px-2 text-sm font-medium">
              Favorite                            

            </Menu.Button>
          </div>          
        </Menu>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className='flex justify-between py-4 border-b'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-grey-500 text-sm font-extralight'>Market Cap</p>
              {coin.market_data?.market_cap ? (<p className='text-sm'>${coin.market_data.market_cap.usd.toLocaleString()}</p>) : null}
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-grey-500 text-sm font-extralight'>Circulating Supply</p>
              {coin.market_data?.circulating_supply ? (<p className='text-sm'>{coin.market_data.circulating_supply.toLocaleString()}</p>) : null}
            </div>     
          </div>

          <div className='flex justify-between py-4 border-b'>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-grey-500 text-sm font-extralight'>Volume (24h)</p>
              {coin.market_data?.total_volume ? (<p className='text-sm'>${coin.market_data.total_volume.usd.toLocaleString()}</p>) : null}
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-grey-500 text-sm font-extralight'>Total Supply</p>
              {coin.market_data?.total_supply ? (<p className='text-sm'>{coin.market_data.total_supply.toLocaleString()}</p>) : null}
            </div>
          </div>

          <div className='flex justify-between py-4 border-b'>
            <div className=''>
              <p className='text-grey-500 text-sm font-extralight'>Fully Diluted Valuation</p>
              {coin.market_data?.fully_diluted_valuation ? (<p className='text-sm'>${coin.market_data.fully_diluted_valuation.usd.toLocaleString()}</p>) : null}
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-grey-500 text-sm font-extralight'>Max Supply</p>
              {coin.market_data?.max_supply ? (<p className='text-sm'>{coin.market_data.max_supply.toLocaleString()}</p>) : (<p>∞</p>)}
            </div>          
          </div>      

          <div className='cursor-pointer' onClick={() => setShowInfo(!showInfo)}>
            {showInfo ? 
            <div>
            <div className='flex justify-between py-4 border-b cursor-auto'>
            <div className=''>
              <p className='text-grey-500 text-sm font-extralight'>Fully Diluted Valuation</p>
              {coin.market_data?.fully_diluted_valuation ? (<p className='text-sm'>${coin.market_data.fully_diluted_valuation.usd.toLocaleString()}</p>) : null}
            </div>
            <div className='flex flex-col justify-center items-center'>
              <p className='text-grey-500 text-sm font-extralight'>Max Supply</p>
              {coin.market_data?.max_supply ? (<p className='text-sm'>{coin.market_data.max_supply.toLocaleString()}</p>) : (<p>∞</p>)}
            </div>                        
          </div>  
          
          <div className='flex justify-between  cursor-pointer'>
            <p className='border-b'>Show less</p>                       
        </div>  
        </div>
            : '(Show more)'}            
            </div>
            
          
          
          <div className='content mt-10 flex'>
            <div className='flex flex-col'>
                <div className='flex'>
                    <div className='border-l p-5'>
                        <h4>24 Hour High</h4>
                        {coin.market_data?.high_24h ? <p className='text-green-600'>${coin.market_data.high_24h.usd.toLocaleString()}</p> : null}
                    </div>
                    <div className='border-l p-5'>
                        <h4 className=''>24 Hour Low</h4>
                        {coin.market_data?.low_24h ? <p className='text-red-600'>${coin.market_data.low_24h.usd.toLocaleString()}</p> : null}
                    </div>
                    <div className='border-l p-5'>
                        <h4>All Time High</h4>
                        {coin.market_data?.ath ? <p className='text-green-600'>${coin.market_data.ath.usd.toLocaleString()}</p> : null}
                    </div>
                    <div className='border-l border-r p-5'>
                        <h4>All Time Low</h4>
                        {coin.market_data?.atl ? <p className='text-red-600'>${coin.market_data.atl.usd.toLocaleString()}</p> : null}
                    </div>                    
                </div>
                <div className='mt-5'>
                  <h3>Last 7 days</h3>                
                <Sparklines data={coin.market_data?.sparkline_7d.price}>
                  <SparklinesLine color='teal'/>
                </Sparklines>                          
                </div>
            </div>
        </div>
        </div>

        <div className='border-l ml-14'>
        <div className='ml-20 mb-3'>
              <h1 className='font-bold text-2xl'>
                <span className='text-green-600'>ONE-CLICK</span>
                <br />
                <span>CROSS-CHAIN</span>
              </h1>
              <p className='text-sm'>Rubic can swap any of 15,500+ tokens, across 20 blockchains in one transaction</p>            
              <p className='flex mt-2'><FaSync className='mr-2'/> <FaCoins className=''/></p>
            </div>          
          <RubicWidget />
        </div>        
      </div> 

            
      <div className=''>  
        <div className='rounded-div dark:bg-gray-800 border-none'>
        <div className='flex justify-evenly mb-2'>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>1h</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>24h</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>7d</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>14d</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>30d</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>1y</div>
        </div>

        <div className='border dark:border-gray-900 border-gray-200'></div>
        <div className='flex justify-evenly'>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>{coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</div>
          <div className='w-36 dark:bg-gray-800 bg-gray-200 rounded-sm flex justify-center items-center border-none'>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</div>
        </div> 
        </div>        
        {/**
         <table className='flex flex-col border'>
                <thead className=''>
                    <tr className='flex justify-evenly text-center'>
                        <th className='' id='th-chart'>24h</th>
                        <th className='' id='th-chart'>7d</th>
                        <th className='' id='th-chart'>1h</th>
                        <th className='' id='th-chart'>14d</th>
                        <th className='' id='th-chart'>30d</th>
                        <th className='' id='th-chart'>1y</th>
                    </tr>
                </thead>
                <tbody className=''>
                    <tr className='flex justify-evenly text-center'>
                        <td className=''>{coin.market_data?.price_change_percentage_1h_in_currency ? <p>{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                        <td className=''>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(1)}%</p> : null}</td>
                        <td className=''>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                        <td className=''>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                        <td className=''>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(1)}%</p> : null}</td>
                        <td className=''>{coin.market_data?.price_change_percentage_24h_in_currency ? <p>{coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(1)}%</p> : null}</td>

                    </tr>
                </tbody>
            </table>
         */}
      </div>
      {/**Description */}
      <div className='py-4'>
        <p className='text-xl font-bold'>About {coin.name}</p>
        <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : ''), }}></p>
      </div>
    </div>
  )
}

export default CoinPage


