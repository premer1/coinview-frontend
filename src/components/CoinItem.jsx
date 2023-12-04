import React from 'react'
import { AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { Sparklines, SparklinesLine } from 'react-sparklines'

const CoinItem = ({coin}) => {
  return (
    
    <tr className='h-[60px] dark:md:hover:bg-zinc-900 md:hover:bg-slate-100 border-b dark:md:border-gray-600 md:border-gray-200 overflow-hidden' >
        <td><AiOutlineStar /></td>
        <td>{coin.market_cap_rank}</td>
        <td>
            <Link to={`/coin/${coin.id}`}>
            <div className='flex items-center'>
                <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.id}/>
                <p className='hidden sm:table-cell'>{coin.name}</p> 
                <p className='text-xs ml-3'>{coin.symbol.toUpperCase()}</p>
            </div>
            </Link>
            
        </td>
        <td></td>
        <td className='text-sm'>${coin.current_price.toLocaleString()}</td>
        <td className='text-sm'>
            {coin.price_change_percentage_24h > 0 ? (<p className='text-green-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>) : (<p className='text-red-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>)}
            </td>
        <td className='w-[180px] text-sm hidden md:table-cell'>{coin.total_volume.toLocaleString()}</td>
        <td className='2-[180px] text-sm hidden sm:table-cell'>{coin.market_cap.toLocaleString()}</td>
        <td>
            <Sparklines data={coin.sparkline_in_7d.price}>
                <SparklinesLine color='teal' />
            </Sparklines>
        </td>
        
    </tr>

    // Search div

    


  )
}

export default CoinItem