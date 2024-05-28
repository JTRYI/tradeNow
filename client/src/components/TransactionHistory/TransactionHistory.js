import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/transactions/123456')  // replace with dynamic customer ID if needed
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  if (transactions.length === 0) {
    return <div>No transaction history details</div>;
  }

  return (
    <div>
      {transactions.map((transaction, index) => (
        <div key={index}>
          <h2>Transaction ID: {transaction.id}</h2>
          <h2>SGD $ {transaction.amount / 100} is transferred to {transaction.recipientName}</h2>
          <h2>using recipient email : {transaction.email}</h2>
          <h3>Transfer Remark : {transaction.subject}</h3>
          <h3>Transfer Date : {transaction.date}</h3>
        </div>
      ))}
      <Link to="/services"><h2>Back to Main Menu</h2></Link>
    </div>
  );
};

export default TransactionHistory;
