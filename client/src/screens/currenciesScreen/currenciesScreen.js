import React, { useEffect, useState } from 'react';
import './currenciesScreen.css';
import MyNavbar from '../../components/MyNavbar/MyNavbar';
import axios from 'axios';
import Coins from '../../components/Coins/Coins';
import { InputGroup, Input, InputRightElement, Box, useDisclosure, useToast, Spinner } from '@chakra-ui/react';
import { TbSearch } from "react-icons/tb";
import QueryResult from '../../components/QueryResult/QueryResult';



const CurrenciesScreen = () => {

  const [coins, setCoins] = useState([]);
  const [query, setQuery] = useState('');
  const [queryResult, setQueryResult] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=sgd&per_page=10&page=1&sparkline=false'

  useEffect(() => {

    axios.get(url).then((response) => {

      setCoins(response.data)
      // console.log(response.data[0])

    }).catch((error) => {

      console.log(error);
    })

  }, []);

  async function searchCrypto() {

    if (!query.trim()) {
      return; // Prevent empty search
    }

    setIsLoading(true);
    const searchUrl = `https://api.coingecko.com/api/v3/search?query=${query}`

    setQuery('');

    await axios.get(searchUrl).then((res) => {

      // console.log("Result", res.data);
      if (res.data.coins.length === 0) {
        toast({
          title: 'No Results Found!',
          description: "Search for a valid Cryptocurrency.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        setQueryResult(res.data.coins);
        onOpen();
      }

    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setIsLoading(false);
    })

  }

  return (
    <div className="CurrenciesScreen" style={{ backgroundColor: '#26272b', height: 'auto' }}>
      <MyNavbar />
      <Box style={{ maxWidth: '1140px', margin: 'auto', marginTop: '20px', boxShadow: '0px 0px 12px #18191b', borderRadius: '8px' }}>
        <InputGroup size='lg'>
          <Input
            pr='4.5rem'
            placeholder='Search Cryptocurrency'
            style={{ borderColor: '#26272b' }}
            color='#f4f4f4'
            focusBorderColor='#b386f1'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
            }}
          />
          <InputRightElement width='6rem'>
            {isLoading ? <Spinner thickness='2px'
              speed='0.65s'
              emptyColor='gray.200'
              color='#b386f1' /> : <TbSearch style={{ color: '#f4f4f4', cursor: 'pointer' }} onClick={searchCrypto} />}
          </InputRightElement>
        </InputGroup>
      </Box>
      <Coins coins={coins} />
      {isOpen && queryResult.length > 0 && (
        <QueryResult
          result={queryResult}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </div>
  );
}


export default CurrenciesScreen;
