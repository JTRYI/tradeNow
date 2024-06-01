import React, { useEffect, useState } from 'react'
import './GlobalData.css'
import axios from 'axios'
import { Box, Heading, Stack } from '@chakra-ui/react'
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
} from '@chakra-ui/react'

const GlobalData = () => {

    const url = `https://api.coingecko.com/api/v3/global`;
    const [usdMarketCap, setUsdMarketCap] = useState();
    const [usdTradingVolume, setUsdTradingVolume] = useState();
    const [percentChange, setPercentChange] = useState();

    useEffect(() => {
        axios.get(url).then((response) => {

            const responseData = response.data;
            console.log(response.data)
            const totalMarketCap = responseData.data.total_market_cap;
            let usdMarketCap = totalMarketCap.usd;

            const tradingVolume = responseData.data.total_volume;
            let usdTradingVolume = tradingVolume.usd;

            const formattedMarketCap = usdMarketCap.toLocaleString('en-us');
            setUsdMarketCap(formattedMarketCap);

            const formattedTradingVolume = usdTradingVolume.toLocaleString('en-us');
            setUsdTradingVolume(formattedTradingVolume);

            // console.log("Total Market Cap:", formattedMarketCap);
            // console.log("24h Trading Volume", formattedTradingVolume);

            const marketCapPChange = responseData.data.market_cap_change_percentage_24h_usd;
            const roundedMarketCapPChange = marketCapPChange.toFixed(1);
            setPercentChange(roundedMarketCapPChange);
            // console.log("Percent Change", roundedMarketCapPChange);


        }).catch((error) => {

            console.log(error);
        })
    }, [url])

   
    return (
        <div className='global-details-box'>
            <Stack>
                <Heading size='md'>Global Cryptocurrency Market Details (USD)</Heading>
                <Box border="1px solid #c8ccd5" 
                borderRadius="8px" 
                padding="15px" 
                marginBottom="16px">
                    <Stat>
                        <StatLabel style={{color: '#c8ccd5'}}>Market Cap</StatLabel>
                        <StatNumber>${usdMarketCap}</StatNumber>
                        <StatHelpText style={{color: percentChange >= 0 ? 'green' : 'red'}}>
                            <StatArrow type={percentChange >= 0 ? 'increase' : 'decrease'} />
                            {percentChange} %
                        </StatHelpText>
                    </Stat>
                </Box>

                <Box border="1px solid #c8ccd5" 
                borderRadius="8px" 
                padding="15px" >
                    <Stat>
                        <StatLabel style={{color: '#c8ccd5'}}>24h Trading Volume</StatLabel>
                        <StatNumber>${usdTradingVolume}</StatNumber>
                    </Stat>
                </Box>
            </Stack>
        </div>
    )
}

export default GlobalData
