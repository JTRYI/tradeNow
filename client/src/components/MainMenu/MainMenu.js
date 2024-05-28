import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const MainMenu = () => {
  const [customer, setCustomer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Properly decode the token before storing it
      const decodedToken = decodeURIComponent(token);
      localStorage.setItem('token', decodedToken);
    }

    const fetchData = async () => {
      const storedToken = localStorage.getItem('token');

      if (!storedToken) {
        console.log("No Stored Token");
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/services', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        });
        setCustomer(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Error 401");
        } else {
          console.error('Error fetching customer:', error);
        }
      }
    };

    fetchData();
  }, [location.search]);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome {customer.firstName} {customer.lastName} (Internal FIDOR ID: {customer.id})</h1>
      <h2>FIDOR Bank Account ({customer.accountNo}) - Balance $ {customer.balance}</h2>
      <h2><u>Banking Menu</u></h2>
      <Link to="/bank_transfer"><h2>Bank Transfer</h2></Link>
      <Link to="/transaction_history"><h2>Transaction History</h2></Link>
    </div>
  );
};

export default MainMenu;
