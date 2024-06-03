import React, { useEffect, useState } from 'react';
import './MarketHolidays.css'
import axios from 'axios';
import { Card, CardHeader, CardBody, Stack, Box, StackDivider, Text, Heading, Spinner, Center } from '@chakra-ui/react';

const MarketHolidays = () => {

    const url = `https://api.polygon.io/v1/marketstatus/upcoming?apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`
    const [holidays, setHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(url).then((res) => {
            // console.log("Data",res.data);
            setHolidays(res.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
            setIsLoading(false);
        })
    }, [url])

    return (
        <Card minWidth='300px'>
            <CardHeader>
                <Heading size='md'>Upcoming Market Holidays</Heading>
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
                ) : holidays ? (
                    <Stack divider={<StackDivider />} spacing='1'>
                        {holidays.map((holiday, index) => (
                            <Box key={index}>
                                <Heading size='xs' textTransform='uppercase'>
                                    {holiday.name} ({holiday.exchange})
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    <b>Date:</b> {new Date(holiday.date).toLocaleDateString()}
                                </Text>
                                <Text pt='2' fontSize='sm'>
                                    <b>Status:</b> {holiday.status.replace("-", " ").toUpperCase()}
                                </Text>
                                {holiday.open && holiday.close && (
                                    <>
                                        <Text pt='2' fontSize='sm'>
                                            <b>Open:</b> {new Date(holiday.open).toLocaleTimeString()}
                                        </Text>
                                        <Text pt='2' fontSize='sm'>
                                            <b>Close:</b> {new Date(holiday.close).toLocaleTimeString()}
                                        </Text>
                                    </>
                                )}
                            </Box>
                        ))}
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

export default MarketHolidays;
