import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const TransferResult = () => {
  const location = useLocation();
  const transaction = location.state.transaction;

  return (
    <div>
      {transaction ? (
        <div>
          <h1>Bank Transfer Completed (Transaction ID: {transaction.id})</h1>
          <h2>SGD ${transaction.amount / 100} is transferred to {transaction.recipientName}</h2>
          <h2>using recipient email : {transaction.email}</h2>
          <h2>Transfer Remark : {transaction.subject}</h2>
          <Link to="/services"><h2>Back to Main Menu</h2></Link>
        </div>
      ) : (
        <div>
          <h1>No customer details</h1>
          <Link to="/index">back to index</Link>
        </div>
      )}
    </div>
  );
};

export default TransferResult;

