import React from 'react'
import { Link } from 'react-router-dom'

const NavBottom = () => {
  

  return (
    <div className='rounded-div border-none dark:md:border-gray-600 md:border-gray-200'>
      <div className='border-b hidden sm:block'>
        <nav className='flex items-center h-12'>
          <Link to='/account' className='text-sm hover:text-blue-500'>Portfolio</Link>
          <Link to='/' className='ml-10 text-sm hover:text-blue-500'>Coins</Link>
          <Link className='ml-10 text-sm hover:text-blue-500'>New Coins</Link>
          <Link className='ml-10 text-sm hover:text-blue-500'>Gainers & Losers</Link>
          <Link className='ml-10 hidden md:block text-sm hover:text-blue-500'>Categories</Link>
          <Link className='ml-10 hidden md:block text-sm hover:text-blue-500'>NFT</Link>
          <Link className='ml-10 hidden sm:block text-sm hover:text-blue-500'>DeFi</Link>
          <Link className='ml-10 hidden sm:block text-sm hover:text-blue-500'>Gaming</Link>
          <Link className='ml-10 hidden sm:block text-sm hover:text-blue-500'>BNB</Link>
        </nav>
      </div>
    </div>
  )
}

export default NavBottom