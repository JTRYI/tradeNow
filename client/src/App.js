import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BankTransfer from './components/BankTransfer/BankTransfer';
import TransferResult from './components/TransferResult/TransferResult';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import Auth from './screens/Auth/Auth';
import Dashboard from './screens/Dashboard/Dashboard';
import CurrenciesScreen from './screens/currenciesScreen/currenciesScreen';
import './App.css'
import Coin from './screens/Coin/Coin';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/currencies" element={<CurrenciesScreen />} />
        <Route path='/coin' element={<Coin />}>
          <Route path=':coinId' element = {<Coin/>}/>
        </Route>

        <Route path="/bank_transfer" element={<BankTransfer />} />
        <Route path="/transfer_result" element={<TransferResult />} />
        <Route path="/transaction_history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
