import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './screens/Auth/Auth';
import Dashboard from './screens/Dashboard/Dashboard';
import CurrenciesScreen from './screens/currenciesScreen/currenciesScreen';
import './App.css'
import Coin from './screens/Coin/Coin';
import BuyCoin from './screens/BuyCoin/BuyCoin';
import PortfolioScreen from './screens/PortfolioScreen/PortfolioScreen';
import MoreScreen from './screens/MoreScreen/MoreScreen';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/currencies" element={<CurrenciesScreen />} />
        <Route path="/more" element={<MoreScreen/>} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element = {<Coin/>}/>
        </Route>
        <Route path='/buy' element={<BuyCoin />}>
          <Route path=':cryptoTicker' element = {<BuyCoin/>}/>
        </Route>
        <Route path="/portfolio" element={<PortfolioScreen/>}/>
      </Routes>
    </Router>
  );
};

export default App;
