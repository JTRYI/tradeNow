import React, { useEffect, useState } from 'react'
import './PortfolioScreen.css'
import MyNavbar from '../../components/MyNavbar/MyNavbar'
import axios from 'axios'
import TransactionHistory from '../../components/TransactionHistory/TransactionHistory'
import AccountDetails from '../../components/AccountDetails/AccountDetails'


const PortfolioScreen = () => {

    const token = sessionStorage.getItem('token');

    const [transactionHistory, setTransactionHistory] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/transaction_history', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((res) => {

            setTransactionHistory(res.data.data);

        }).catch((error) => {
            console.error(error);
        })
    }, [token])


    return (
        <div style={{ backgroundColor: '#26272b' }}>
            <MyNavbar />
            <div className='portfolio-body'>
                <TransactionHistory transactionHistory={transactionHistory} />
                <AccountDetails/>
            </div>
        </div>
    )
}


export default PortfolioScreen
