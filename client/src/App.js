import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainMenu from './components/MainMenu/MainMenu';
import BankTransfer from './components/BankTransfer/BankTransfer';
import TransferResult from './components/TransferResult/TransferResult';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import Auth from './components/Auth/Auth';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/services" element={<MainMenu />} />
        <Route path="/bank_transfer" element={<BankTransfer />} />
        <Route path="/transfer_result" element={<TransferResult />} />
        <Route path="/transaction_history" element={<TransactionHistory />} />
        <Route path="/" element={<Auth/>} />
      </Routes>
    </Router>
  );
};

export default App;
