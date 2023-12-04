import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "./context/ThemeContext";

import Home from "./routes/Home";
import CoinPage from './routes/CoinPage'
import axios from 'axios'
import Global from "./components/Global";
import NavBottom from "./components/NavBottom";
import Footer from "./components/Footer";
import TrendigCoins from './components/TrendigCoins'




  
function App() {
  
  const [coins, setCoins] = useState([])

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true'
  
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      //console.log(response.data)
    })
  },[url])
  

  return <ThemeProvider>
    
    <Global />
    <Navbar />
    <Routes exact >
    <Route exact path="/" element={<NavBottom />} />
    </Routes>
    <Routes>
    <Route exact path='/' element={<TrendigCoins />}> 
    </Route>   
    </Routes>
    <Routes>      
      {/** <Route exact path="/" element={<Ads />} />*/}      
    </Routes>
    <Routes exact >    
      <Route path='/' element={<Home coins={coins} />} />      
      <Route path='/coin/:coinId' element={<CoinPage />}>        
        <Route path=':coinId' />
      </Route>
    </Routes>
    <Footer />
    
  </ThemeProvider>
}

export default App;
