import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'
import { AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../images/CvLogo.png'

const Navbar = () => {
    const [nav, setNav] = useState(false); 

    
    

    const handleNav = () => {
        setNav(!nav);
    }

  
      
  return (
    <div className='border-b dark:md:border-gray-600 md:border-gray-200'>
           <div className='rounded-div border-none flex items-center justify-between h-20 sans-serif'>

    <Link to='/'>
      <div className=''>
      <img src={logo} alt="" className='rounded-lg' />
      </div>
    
    </Link>
    <Menu as="div" className="relative hidden lg:block text-left">
      <div>
        <Menu.Button className="inline-flex border-none w-full justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Cryptocurrencies
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
               <Link to='/'>Coins</Link>
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
    {/* */}
    <Menu as="div" className="relative hidden lg:block text-left">
      <div>
      <Menu.Button className="inline-flex border-none w-full justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Exchanges
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
              {({ active }) => (
               <Link to='/'>Coins</Link>
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
    

    <Menu as="div" className="relative hidden lg:block text-left">
      <div>
      <Menu.Button className="inline-flex border-none w-full justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          NFT
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
              {({ active }) => (
               <Link to='/'>Coins</Link>
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
    
    <Menu as="div" className="relative hidden lg:block text-left">
      <div>
      <Menu.Button className="inline-flex border-none w-full justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          NEWS
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
              {({ active }) => (
               <Link to='/'>Coins</Link>
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

    <Menu as="div" className="relative hidden lg:block text-left">
      <div>
      <Menu.Button className="inline-flex border-none w-full justify-center rounded-full border-gray-300 dark:bg-blue-900 bg-blue-600 text-white dark:text-white px-2 py-1 text-sm font-medium shadow-sm dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Products
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
              {({ active }) => (
               <Link to='/'>CoinView Merch</Link>
              )}
            </Menu.Item>
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100'>
              {({ active }) => (
              <Link>API</Link>
              )}
            </Menu.Item>
            <div className='mt-1 border-t flex flex-col'>
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100 mb-0.5'>
              {({ active }) => (
                <Link>Bitcoin Live</Link>
              )}
            </Menu.Item>
            <Menu.Item className='dark:hover:bg-gray-900 hover:bg-gray-100'>
              {({ active }) => (
                <Link>Ledger</Link>
              )}
            </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    <div className='hidden lg:block justify-items-end'>
        <ThemeToggle />
    </div>
  

    {/* Menu Icon */}
    <div onClick={handleNav} className='block lg:hidden cursor-pointer z-10'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
    </div>
    { /* Mobile Menu */}
    <div className={nav
            ? 'lg:hidden fixed left-0 top-20 flex flex-col justify-between w-full h-[90%] bg-primary ease-in duration-300 z-'
            : 'fixed left-[-100%] top-20 h-[90%] flex flex-col justify-between ease-in duration-300'
        }>
          
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex border-none w-44 justify-center rounded-md  border border-gray-300 dark:bg-indigo-900 dark:text-white px-4 py-2 text-sm font-medium shadow-sm dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Cryptocurrencies
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
      <div>
        <Menu.Button className="inline-flex border-none w-44 justify-center rounded-md  border border-gray-300 dark:bg-indigo-900 dark:text-white px-4 py-2 text-sm font-medium shadow-sm dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Exchanges
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
      <div>
        <Menu.Button className="inline-flex border-none w-44 justify-center rounded-md border border-gray-300 dark:bg-indigo-900 dark:text-white px-4 py-2 text-sm font-medium shadow-sm dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          NFT
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
      <div>
        <Menu.Button className="inline-flex border-none w-44 justify-center rounded-md border border-gray-300 dark:bg-indigo-900 dark:text-white px-4 py-2 text-sm font-medium shadow-sm dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          NEWS
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
      <div>
        <Menu.Button className="inline-flex border-none w-44 justify-center rounded-md border border-gray-300 dark:bg-indigo-900 dark:text-white px-4 py-2 text-sm font-medium shadow-sm dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          Products
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
               <Link to='/'>CoinView Merch</Link>
              )}
            </Menu.Item>
            <Menu.Item className='hover:bg-gray-900 mb-0.5'>
              {({ active }) => (
              <Link>API</Link>
              )}
            </Menu.Item>
            <div className='mt-1 border-t flex flex-col'>
            <Menu.Item className='hover:bg-gray-900 mb-0.5'>
              {({ active }) => (
                <Link>Bitcoin Live</Link>
              )}
            </Menu.Item>
            <Menu.Item className='hover:bg-gray-900'>
              {({ active }) => (
                <Link>Ledger</Link>
              )}
            </Menu.Item>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
    
        <ul className='w-fill p-4'>        
            <li className='border-b py-6'>
                <Link to='/'>Home</Link>
            </li>
            <li className='border-b py-6'>
                <Link to='/'>Account</Link>
            </li>
            <li className='border-b py-6'>
                <ThemeToggle />
            </li>
        </ul>
        <div>
          
        </div>
        
        <div className='flex flex-col w-full p-4'>            
            <Link to='/signin'>
                <button className='w-full my-2 p-3 bg-primary border border-secondary rounded-2xl shadow-xl'>Sign In</button>
            </Link>
            <Link to='/signup'>
                <button className=''>Sign Up</button>
            </Link>
        </div>
    </div>

</div>
    </div>
  )
}

export default Navbar
