import React, { useEffect, useState } from 'react';
import './MarketHolidays.css';
import axios from 'axios';
import { Card, CardHeader, CardBody, Stack, Box, StackDivider, Text, Heading, Spinner, Center } from '@chakra-ui/react';

const MarketHolidays = () => {
    const url = `https://api.polygon.io/v1/marketstatus/upcoming?apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`;
    const [holidays, setHolidays] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get(url).then((res) => {
            setHolidays(res.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
            setError(true);
            setIsLoading(false);
        });
    }, [url]);

    return (
        <Box className='marketHoliday-box'>
            <Card minWidth='300px' color='#f4f4f4' backgroundColor='#26272b'>
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
                    ) : error ? (
                        <Text pt='2' fontSize='sm'>
                            Too Many API Requests.
                        </Text>
                    ) : holidays && holidays.length > 0 ? (
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
                            No upcoming holidays found.
                        </Text>
                    )}
                </CardBody>
            </Card>
        </Box>
    );
}

export default MarketHolidays;
