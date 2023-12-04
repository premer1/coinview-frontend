import React, { useState } from 'react'

import { Link } from 'react-router-dom'
import TablePagination from '@mui/material/TablePagination'

import CoinItem from './CoinItem'
const CoinSearch = ({coins}) => {

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase()
  );
  

  
   // console.log(coins)


  return (
    <div className='rounded-div my-4 border-none bg-repeat' >
        <div className='flex flex-col  md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
            <h1 className='text-2xl my-2'>Cryptocurrency Prices by Market Cap </h1>
            <form>
                <input onChange={(e) => setSearchText(e.target.value)}
            className='w-full bg-primary border border-input px-4 py-2 rounded-r-lg shadow-xl'
            type='text'
            placeholder='Search...'/>
            {searchText.length !== 0 && (
              <div className='absolute z-10 h-80 w-80 border rounded-r-lg overflow-hidden dark:bg-gray-800 bg-white'>
                
              {coins
            // eslint-disable-next-line array-callback-return
            .filter((value) => {
              if (searchText === '') {
                return value;
              } else if (
                value.symbol.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
              } else if (
                value.name.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return value;
                }
            })
                .map((coin) => (
                  <div className='overflow-hidden flex shrink w-80 h-14 dark:hover:bg-gray-900 hover:bg-gray-100'>
                    <td className='ml-2 mt-2'>#{coin.market_cap_rank}</td>
                   <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center ml-2 mt-2 '>
                      <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.id}/>
                      <p className='hidden sm:table-cell'>{coin.name}</p> 
                      <p className='text-xs ml-3'>{coin.symbol.toUpperCase()}</p>
                    </div>
                  </Link>
                  </div>
                ))}
              </div>
              )}
            </form>
        </div>
          <TablePagination                
          component="div"          
          sx={{
            color: 'black',
          }}
          className='dark:text-white'
          count={250}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />   
        <table className='w-full border-collapse text-center'>
            <thead>
                <tr className='border-t border-b dark:md:border-gray-600 md:border-gray-200'>
                    <th></th>
                    <th className='px-4'>#</th>
                    <th className='text-left'>Coin</th>
                    <th></th>
                    <th>Price</th>                    
                    <th>24h</th>
                    <th className='hidden md:table-cell'>24h Volume</th>
                    <th className='hidden sm:table-cell'>Market Cap</th>
                    <th>Last 7 Days</th>                    
                </tr>
            </thead>
            <tbody className=''>
            {(rowsPerPage > 0
                  ? filteredCoins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  : filteredCoins
            ).map(coin => (
              < CoinItem key={coin.id} coin={coin} />
            ))}
            </tbody>
        </table>
        <div className=''>
        <TablePagination                
            component="div"            
            sx={{
              color: 'black',
            }}
            className='dark:text-white'
            count={250}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />          
        </div>          
    </div>
  )
}

export default CoinSearch