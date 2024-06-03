import React, { useEffect, useState } from 'react'
import './News.css'
import axios from 'axios'
import { Card,  CardBody, Box, Image, Stack, Heading, Text } from '@chakra-ui/react'

const News = () => {

    const [news, setNews] = useState([]);
    const url = `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${process.env.REACT_APP_CRYPTOCOMPARE_API_KEY}`

    useEffect(() => {
        axios.get(url).then((response) => {
            
            const responseData = response.data.Data;
            //Get 10 News Only
            setNews(responseData.slice(0, 10));
            // console.log("News", news);
        }).catch((error) => {
            console.error(error);
        })
    }, [url])


    return (
       <Box >
       <Heading color='#f4f4f4' paddingLeft='20px'>Crypto Related News</Heading>
          <Box className="news-container" padding="20px" maxWidth='80%'>
          {news.map((newsItem) => (
            <Card
              key={newsItem.id}
              direction={{ base: 'column', sm: 'row' }}
              overflow="hidden"
              variant="outline"
              marginBottom="20px"
            >
              <Image
                objectFit="cover"
                maxW={{ base: '100%', sm: '200px' }}
                src={newsItem.imageurl}
                alt={newsItem.title}
              />
              <Stack>
                <CardBody>
                  <Heading size="md">{newsItem.title}</Heading>
                  <Text py="2">
                    {newsItem.body}
                  </Text>
                </CardBody>
              </Stack>
            </Card>
          ))}
        </Box>
       </Box>
    )
}

export default News
