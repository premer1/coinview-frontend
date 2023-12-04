import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const NavBottom = () => {
    const [trending, setTrending] = useState([])

    const url = 'https://api.coingecko.com/api/v3/search/trending'

    useEffect(() => {
        axios.get(url).then((response) => {
            setTrending(response.data.coins);
            // console.log(response.data);
        });
    },[]);
  return (
        <div className='rounded-div border-none mt-2 text-primary'>
    <h1 className='text-xl font-bold mb-2'>Trending Coins:</h1>
    <div className='grid md:grid-cols-1 lg:grid-cols-7 gap-4'>
        {trending.map((coin, idx) => (
            <div key={idx} className='flex justify-between border-b  hover:scale-105 ease-in-out duration-300'>
                <Link to={`/coin/${coin.id}`}>                    
                <div className='flex items-center justify-between'>
                    <div className='flex'>
                        <img className='mr-4 h-6 w-6 rounded-full' src={coin.item.small} alt={coin.id} />
                        <div>
                            <p className='font-bold text-sm'>{coin.item.name}</p>
                            <p className='text-xs mb-1'>{coin.item.symbol}</p>
                        </div>
                    </div>
                </div>                
                </Link>
            </div>
        ))}
    </div>
    </div>
  )
}

export default NavBottom