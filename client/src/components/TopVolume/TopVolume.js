import React, { useState, useEffect } from 'react'
import './TopVolume.css'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Avatar,
    Box,
    Heading,

} from '@chakra-ui/react'
import axios from 'axios'
import Chart from 'react-apexcharts';

const TopCoin = (props) => {

    const { coin } = props;

    const [ohlcData, setOhlcData] = useState([]);

    useEffect(() => {
        const fetchOhlcData = async () => {
            try {
                const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=1`);
                setOhlcData(response.data);
            } catch (error) {
                console.error('Error fetching OHLC data:', error);
            }
        };

        fetchOhlcData();
    }, [coin.id]);

    const closingPrices = ohlcData.map(data => data[4]); // Extracting the closing prices

    const isPriceUp = closingPrices.length > 1 && closingPrices[0] < closingPrices[closingPrices.length - 1];
    const lineColor = isPriceUp ? '#00ff00' : '#ff0000'; // Green if price is up, red if down


    const chartOptions = {
        chart: {
            type: 'line',
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            width: 2,
            colors: [lineColor] // Dynamic line color
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            type: 'datetime',
            labels: {
                show: false
            }
        },
        yaxis: {
            labels: {
                show: false
            }
        }
    };

    const chartSeries = [{
        name: 'Closing Prices',
        data: ohlcData.map(data => [data[0], data[4]]) // Using timestamp and closing price
    }];

    const coinPrice = coin.current_price.toLocaleString();
    const volume24h = coin.total_volume.toLocaleString();

    return (
        <Tr>

            <Td>
                <Box className="top-coin-profile">
                    <Avatar size='sm' src={coin.image} mr={3} />
                    <span style={{ color: '#f4f4f4' }}>{coin.symbol.toUpperCase()}</span>
                </Box>
            </Td>
            <Td color='#f4f4f4'>
                ${coinPrice}
            </Td>
            <Td color='#f4f4f4'>
                ${volume24h}
            </Td>
            <Td color='#f4f4f4' style={{ width: '225px', paddingLeft: '55px' }}>

                {ohlcData.length > 0 && (
                    <Chart options={chartOptions} series={chartSeries} type="line" height={50} width={100} />
                )}

            </Td>

        </Tr>
    )
}

const TopVolume = () => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=3&page=1`
    const [topCoins, setTopCoins] = useState([]);

    useEffect(() => {
        axios.get(url).then((res) => {

            const resData = res.data;

            console.log("Top Coins", resData);
            setTopCoins(resData);

        }).catch((error) => {
            console.error(error);
        })

    }, [url]);

    // This method will map out the trending coins on the table
    function topCoinsList() {

        return topCoins.map((topCoin) => (
            <TopCoin
                coin={topCoin}
            />
        ));
    }

    return (
        <Box className='top-coins-container'>
            <Box display='flex' alignItems='center'>
                <Heading size='md' color='#f4f4f4' padding='15px'>Top Coins By 24h Trading Volume</Heading>
            </Box>
            <TableContainer overflowY="auto">
                <Table variant='simple' size='sm'>
                    <Thead className="sticky-header">
                        <Tr>
                            <Th style={{ color: '#f4f4f4' }}>Coin</Th>
                            <Th style={{ color: '#f4f4f4' }}>Price (USD)</Th>
                            <Th style={{ color: '#f4f4f4' }}>24h Volume (USD)</Th>
                            <Th style={{ color: '#f4f4f4' }}>24h Price Chart (USD)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {topCoinsList()}
                    </Tbody>

                </Table>
            </TableContainer>
        </Box>

    )
}

export default TopVolume
