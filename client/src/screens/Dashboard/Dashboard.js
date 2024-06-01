import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import MyNavbar from '../../components/MyNavbar/MyNavbar';
import { Spinner } from '@chakra-ui/react';
import GlobalData from '../../components/GlobalData/GlobalData';
import './Dashboard.css'
import TrendingCoins from '../../components/TrendingCoins/TrendingCoins';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Properly decode the token before storing it
      const decodedToken = decodeURIComponent(token);
      sessionStorage.setItem('token', decodedToken);
    }

    const fetchData = async () => {
      const storedToken = sessionStorage.getItem('token');

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
        console.log("Responce for Services Route", response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Error 401");
        } else {
          console.error('Error fetching User:', error);
        }
      }
    };

    fetchData();
  }, [location.search]);


  return (
    user ? (
      <div style={{ backgroundColor: '#26272b;' }}>
        <MyNavbar />
        <div className='dashboard-body'>
          <div className='upper-body'>
            <GlobalData />
            <TrendingCoins/>
          </div>
        </div>
      </div>
    ) : (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#26272b' }}>
        <h4 style={{ color: '#f4f4f4' }}>Loading... Please Wait...</h4>
        <Spinner
          marginTop='20px'
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='#b386f1'
          size='xl'
        />
      </div>

    )
  );
};

export default Dashboard;
