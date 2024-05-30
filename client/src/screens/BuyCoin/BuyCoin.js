import React, { useState } from 'react'
import './BuyCoin.css'
import MyNavbar from '../../components/MyNavbar/MyNavbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'
import CandlestickChart from '../../components/CandlestickChart/CandlestickChart'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import BuySummary from '../../components/BuySummary/BuySummary'

const getFormattedDate = (date) => date.toISOString().split('T')[0];

const getRangeDates = (range) => {
    const today = new Date();
    const endDate = new Date(today.setDate(today.getDate() - 2)); // 2 days before today
    let startDate;

    switch (range) {
        case '1Y':
            startDate = new Date(today.setFullYear(today.getFullYear() - 1));
            break;
        case '6M':
            startDate = new Date(today.setMonth(today.getMonth() - 6));
            break;
        case '3M':
            startDate = new Date(today.setMonth(today.getMonth() - 3));
            break;
        case '1W':
            startDate = new Date(today.setDate(today.getDate() - 7));
            break;
        case '1M':
        default:
            startDate = new Date(today.setMonth(today.getMonth() - 1));
            break;
    }

    return { startDate: getFormattedDate(startDate), endDate: getFormattedDate(endDate) };
};

const BuyCoin = () => {

    const params = useParams()
    const cryptoTicker = params.cryptoTicker.toUpperCase();
    const polygonAPIKey = process.env.REACT_APP_POLYGON_API_KEY;

    const [ohlcData, setOhlcData] = useState([]);

    const [range, setRange] = useState('1M'); // Default range is 1 Month

    useEffect(() => {
        const { startDate, endDate } = getRangeDates(range);
        const url = `https://api.polygon.io/v2/aggs/ticker/X:${cryptoTicker}USD/range/1/day/${startDate}/${endDate}?adjusted=true&sort=asc&apiKey=${polygonAPIKey}`


        axios.get(url).then((res) => {

            const formattedData = res.data.results.map(item => ({
                x: new Date(item.t),
                y: [item.o, item.h, item.l, item.c]
            }));
            setOhlcData(formattedData);

        }).catch((error) => {
            console.log(error);
        })

    }, [cryptoTicker, range, polygonAPIKey])

    const cryptoCompareAPIKey = process.env.REACT_APP_CRYPTOCOMPARE_API_KEY;
    const [price, setPrice] = useState();

    useEffect(() => {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${cryptoTicker}&tsyms=USD,SGD&api_key=${cryptoCompareAPIKey}`

        axios.get(url).then((res) => {
            setPrice(res.data);
        }).catch((error) => {
            console.log(error);
        })

    }, [cryptoTicker, cryptoCompareAPIKey])


    return (
        <div className='buy-coin-screen'>
            <MyNavbar />
            <div className='buy-container'>
                <div className='buy-left'>
                    <CandlestickChart ohlcData={ohlcData} cryptoTicker={cryptoTicker} />

                    <Tabs defaultIndex={1} onChange={(index) => {
                        const ranges = ['1W', '1M', '3M', '6M', '1Y'];
                        setRange(ranges[index]);
                    }} className='left-tabs' variant='soft-rounded' colorScheme='purple'>
                        <TabList>
                            <Tab style={{ color: '#825db4' }}>1 Week</Tab>
                            <Tab style={{ color: '#825db4' }}>1 Month</Tab>
                            <Tab style={{ color: '#825db4' }}>3 Months</Tab>
                            <Tab style={{ color: '#825db4' }}>6 Months</Tab>
                            <Tab style={{ color: '#825db4' }}>1 Year</Tab>
                        </TabList>
                        <TabPanels style={{ paddingLeft: '22%', paddingTop: '2%' }}>
                            <TabPanel>
                                <h5 style={{ color: '#f4f4f4' }}>1 Week Data</h5>
                            </TabPanel>
                            <TabPanel>
                                <h5 style={{ color: '#f4f4f4' }}>1 Month Data</h5>
                            </TabPanel>
                            <TabPanel>
                                <h5 style={{ color: '#f4f4f4' }}>3 Months Data</h5>
                            </TabPanel>
                            <TabPanel>
                                <h5 style={{ color: '#f4f4f4' }}>6 Months Data</h5>
                            </TabPanel>
                            <TabPanel>
                                <h5 style={{ color: '#f4f4f4' }}>1 Year Data</h5>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </div>

                <BuySummary cryptoPrice={price} cryptoTicker={cryptoTicker} />

            </div>
        </div>
    )
}

export default BuyCoin
