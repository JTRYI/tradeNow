import React, { useEffect, useState } from 'react'
import './MarketStatus.css'
import axios from 'axios'
import { Card, CardHeader, CardBody, Stack, Box, StackDivider, Text, Heading, Spinner, Center } from '@chakra-ui/react'

const MarketStatus = () => {

    const url = `https://api.polygon.io/v1/marketstatus/now?apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`
    const [marketStatus, setMarketStatus] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(url).then((res) => {
            // console.log("Data",res.data);
            setMarketStatus(res.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
            setIsLoading(false);
        })
    }, [url])
    // console.log("Data", marketStatus);

    return (
        <Card minWidth='250px'>
            <CardHeader>
                <Heading size='md'>Market Status</Heading>
            </CardHeader>

            <CardBody>
                {isLoading ? (
                    <Center height="200px">
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='#b386f1'
                            size='xl'
                        />
                    </Center>
                ) :
                    marketStatus ? (
                        <Stack divider={<StackDivider />} spacing='2'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Currencies
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <b>Crypto:</b> {marketStatus.currencies.crypto.toUpperCase()}
                                </Text>
                                <Text pt='2' fontSize='sm'>
                                    <b>FX:</b> {marketStatus.currencies.fx.toUpperCase()}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Exchanges
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <b>NASDAQ:</b> {marketStatus.exchanges.nasdaq.toUpperCase()}
                                </Text>
                                <Text pt='2' fontSize='sm'>
                                    <b>NYSE:</b> {marketStatus.exchanges.nyse.toUpperCase()}
                                </Text>
                                <Text pt='2' fontSize='sm'>
                                    <b>OTC:</b> {marketStatus.exchanges.otc.toUpperCase()}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Server Time
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {new Date(marketStatus.serverTime).toLocaleString()}
                                </Text>
                            </Box>
                        </Stack>
                    ) : (
                        <Text pt='2' fontSize='sm'>
                            Too Many API Request.
                        </Text>
                    )}
            </CardBody>
        </Card>
    );
}

export default MarketStatus
