import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BankTransfer = ({ customer }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fidorID: customer ? customer.id : '',
    customerEmailAdd: '',
    transferAmount: '',
    transferRemarks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:5000/transfer', formData)
      .then(response => {
        console.log('Transfer result:', response.data);
        navigate('/transfer_result', { state: { transaction: response.data } });
      })
      .catch(error => console.error('Error processing transfer:', error));
  };

  return (
    <div>
      <h2>FIDOR Bank Account ({customer.accountNo}) - Balance ${customer.balance}</h2>
      <form onSubmit={handleSubmit}>
        <label>Your FIDOR ID:</label>
        <input type="text" name="fidorID" value={formData.fidorID} onChange={handleChange} /><br /><br />
        <label>Recipient Email Address:</label>
        <input type="text" name="customerEmailAdd" value={formData.customerEmailAdd} onChange={handleChange} /><br /><br />
        <label>Transfer Amount SGD$:</label>
        <input type="text" name="transferAmount" value={formData.transferAmount} onChange={handleChange} />(Limit to SGD$500)<br /><br />
        <label>Remarks:</label>
        <input type="text" name="transferRemarks" value={formData.transferRemarks} onChange={handleChange} /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <a href="/services">Main Menu</a>
    </div>
  );
};

export default BankTransfer;
