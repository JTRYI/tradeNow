import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardHeader, CardBody, Stack, Box, StackDivider, Text, Heading, Spinner, Center } from '@chakra-ui/react';
import './BtcSocialStats.css'

const BtcSocialStats = () => {

    const url = `https://min-api.cryptocompare.com/data/social/coin/latest?coinId=1182&api_key=${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`
    const [socialStats, setSocialStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(url).then((res) => {
            // console.log("Data",res.data);
            setSocialStats(res.data);
            setIsLoading(false);
        }).catch((error) => {
            console.error(error);
            setIsLoading(false);
        })
    }, [url])

    //   console.log("Data", socialStats);

    return (
        <Box className='btcStats-box' marginTop='30px'>
            <Card maxWidth='250px' marginTop='20px' color='#f4f4f4' backgroundColor='#26272b'>
                <CardHeader>
                    <Heading size='md'>Bitcoin Social Stats</Heading>
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
                    ) : (
                        socialStats && (
                            <Stack divider={<StackDivider />} spacing='4'>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        CryptoCompare
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Points:</b> {socialStats.Data.CryptoCompare.Points}
                                    </Text>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Followers:</b> {socialStats.Data.CryptoCompare.Followers}
                                    </Text>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Comments:</b> {socialStats.Data.CryptoCompare.Comments}
                                    </Text>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Posts:</b> {socialStats.Data.CryptoCompare.Posts}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Twitter
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Points:</b> {socialStats.Data.Twitter.Points}
                                    </Text>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Followers:</b> {socialStats.Data.Twitter.followers}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Reddit
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Points:</b> {socialStats.Data.Reddit.Points}
                                    </Text>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Subscribers:</b> {socialStats.Data.Reddit.subscribers}
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        How Points are Tabulated?
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Twitter Points:</b> 0.1 for a follower, 5 for being part of a list and 0.001 for an status update.
                                    </Text>
                                    <Text pt='2' fontSize='sm'>
                                        <b>Reddit Points:</b> 1 for a subscriber, 2 for a comment per day and 3 for an active user.
                                    </Text>
                                </Box>
                            </Stack>
                        )
                    )}
                </CardBody>
            </Card>
        </Box>

    );
}

export default BtcSocialStats;

