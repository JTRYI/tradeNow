import React, { useEffect, useState } from 'react';
import './currenciesScreen.css';
import MyNavbar from '../../components/MyNavbar/MyNavbar';
import axios from 'axios';
import Coins from '../../components/Coins/Coins';


const CurrenciesScreen = () => {

  const [coins, setCoins] = useState([]);

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=sgd&per_page=10&page=1&sparkline=false'

  useEffect(() => {

    axios.get(url).then((response) => {

      setCoins(response.data)
      console.log(response.data[0])

    }).catch((error) => {

      console.log(error);
    })

  }, [])


  return (
    <div className="CurrenciesScreen" style={{backgroundColor: '#26272b', height: 'auto'}}>
      <MyNavbar />
      <Coins coins={coins}/>
    </div>
  );
}


export default CurrenciesScreen;
