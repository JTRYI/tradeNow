import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BankTransfer from './components/BankTransfer/BankTransfer';
import TransferResult from './components/TransferResult/TransferResult';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import Auth from './screens/Auth/Auth';
import Dashboard from './screens/Dashboard/Dashboard';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/bank_transfer" element={<BankTransfer />} />
        <Route path="/transfer_result" element={<TransferResult />} />
        <Route path="/transaction_history" element={<TransactionHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
