import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import './Auth.css'

const Auth = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/';
  };

  return (
    <div className='landing-page'>
      
      <Box maxW='32rem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '33%', marginRight: '33%', marginTop: '15%', color: '#f4f4f4'}}>
        <Heading mb={5} style={{display: 'flex', alignItems: 'center'}}>Welcome to <img
          style={{marginLeft: '15px'}}
          src="/img/tradeNow.png"
          width="80"
          height="80"
          className="d-inline-block align-top"
          alt=''
        /></Heading>
        <Text fontSize='xl'>
          Your one-stop platform for all your trading needs!
        </Text>
        <Button size='lg' mt='24px' onClick={handleLogin} backgroundColor='#b386f1;'
        color='black' borderRadius={8} 
        borderColor='#b386f1'
        _hover={
          {
            color: '#f4f4f4',
            backgroundColor: '#b386f1'
          }
        }>
          Login Now
        </Button>
      </Box>
    </div>
  );
};

export default Auth;