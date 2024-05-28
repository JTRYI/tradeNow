import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import MyNavbar from '../../components/MyNavbar/MyNavbar';

const Auth = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/';
  };

  return (
    <div style={{ height: '100vh' }}>
      <MyNavbar/>
      <Box maxW='32rem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '32%', marginRight: '32%', marginTop: '10%'}}>
        <Heading mb={4} style={{display: 'flex', alignItems: 'center'}}>Welcome to <img
          style={{marginLeft: '15px'}}
          src="/img/tradeNow_logo-removebg.png"
          width="70"
          height="70"
          className="d-inline-block align-top"
        /></Heading>
        <Text fontSize='xl'>
          Your one-stop platform for all your trading needs!
        </Text>
        <Button size='lg' mt='24px' onClick={handleLogin} backgroundColor='rgba(61, 90, 254, 0.7);'
        color='black' borderRadius={8} 
        borderColor='#3D5AFE'
        _hover={
          {
            color: 'white',
            backgroundColor: '#3D5AFE'
          }
        }>
          Login Now!
        </Button>
      </Box>
    </div>
  );
};

export default Auth;