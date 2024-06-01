import React, { useEffect, useState } from 'react'
import './TrendingCoins.css'
import axios from 'axios'
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
    StatArrow,
    Stat
} from '@chakra-ui/react'
import { BsFire } from "react-icons/bs";

const TrendingCoin = (props) => {

    const coinPrice = props.coin.item.data.price.toFixed(2);
    const priceChange24h = props.coin.item.data.price_change_percentage_24h.usd.toFixed(1);

    return (
        <Tr>
            <Td color='#f4f4f4'>
                {props.coin.item.market_cap_rank}
            </Td>
            <Td>
                <Box className="coin-profile">
                    <Avatar size='sm' src={props.coin.item.small} mr={3} />
                    <span style={{ color: '#f4f4f4' }}>{props.coin.item.symbol}</span>
                </Box>
            </Td>
            <Td color='#f4f4f4'>
                ${coinPrice}
            </Td>
            <Td color='#f4f4f4'>
                <Stat><StatArrow type={priceChange24h >= 0 ? 'increase' : 'decrease'} />
                {priceChange24h} %
                </Stat>
            </Td>

        </Tr>
    )
}

const TrendingCoins = () => {

    const url = `https://api.coingecko.com/api/v3/search/trending`
    const [trendingCoins, setTrendingCoins] = useState([]);

    useEffect(() => {
        axios.get(url).then((res) => {

            const resData = res.data;
            const trenCoins = resData.coins;
            setTrendingCoins(trenCoins);

            // console.log("trending coins", trendingCoins);
        }).catch((error) => {
            console.error(error);
        })

    }, [url]);

    // This method will map out the trending coins on the table
    function trendingCoinsList() {

        return trendingCoins.map((trendingCoin) => (
            <TrendingCoin
                coin={trendingCoin}
                key={trendingCoin.item.coin_id}
            />
        ));
    }

    return (
        <Box className='trending-coins-container'>
            <Box display='flex' alignItems='center'>
            <Heading size='md' color='#f4f4f4' padding='15px'>Trending Coins Based on User Searches</Heading>
            <BsFire style={{color: 'orange', transform: 'translateY(-5px', fontSize: '20px'}}/>
            </Box>
            <TableContainer maxHeight="280px"  // Set the fixed height
                overflowY="auto">
                <Table variant='simple' size='sm'>
                    <Thead className="sticky-header">
                        <Tr>
                            <Th style={{ color: '#f4f4f4' }}>Market Rank</Th>
                            <Th style={{ color: '#f4f4f4' }}>Coin</Th>
                            <Th style={{ color: '#f4f4f4' }}>Price (USD)</Th>
                            <Th style={{ color: '#f4f4f4' }}>24h Price Change</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {trendingCoinsList()}
                    </Tbody>

                </Table>
            </TableContainer>
        </Box>

    )
}

export default TrendingCoins
