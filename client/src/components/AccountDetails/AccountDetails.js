import React, {useEffect} from 'react'
import './AccountDetails.css'
import { Card, CardHeader, CardBody, Box, Text, Heading, Stack, StackDivider, Avatar } from '@chakra-ui/react'
import axios from 'axios'

const AccountDetails = () => {

    useEffect(() => {
        
        const fetchData = async () => {
          const storedToken = sessionStorage.getItem('token');
    
          if (!storedToken) {
            console.log("No Stored Token");
            return;
          }
    
          try {
            const response = await axios.get('http://localhost:5000/services', {
              headers: {
                'Authorization': `Bearer ${storedToken}`
              }
            });
            sessionStorage.setItem('user', JSON.stringify(response.data));

          } catch (error) {
            if (error.response && error.response.status === 401) {
              console.log("Error 401");
            } else {
              console.error('Error fetching User:', error);
            }
          }
        };
    
        fetchData();
      }, []);

    const user = JSON.parse(sessionStorage.getItem('user'));
    // console.log("User", user);

    return (
        <Box className='account-details-box'>
            <Card backgroundColor='#26272b' color='#f4f4f4'>
                <CardHeader style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar name={user.firstName} />
                    <Heading size='md' paddingLeft='10px'>{user.nickname}</Heading>
                </CardHeader>
    
                <CardBody>
                    <Stack divider={<StackDivider />} spacing='4'>
                        <Box>
                            <Heading size='sm' textTransform='uppercase'>
                                Account Information
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                               <b> Account No:</b> {user.accountNo}
                            </Text>
                            <Text pt='2' fontSize='sm'>
                                <b>Fidor ID:</b> {user.id}
                            </Text>
                            <Text pt='2' fontSize='sm'>
                                <b>Date Created:</b> {user.accountCreation}
                            </Text>
                            <Text pt='2' fontSize='sm'>
                                <b>Balance:</b> ${user.balance}
                            </Text>
                        </Box>
                        <Box>
                            <Heading size='sm' textTransform='uppercase'>
                                Personal Details
                            </Heading>
                            <Text pt='2' fontSize='sm'>
                                <b>Email:</b> {user.email}
                            </Text>
                            <Text pt='2' fontSize='sm'>
                                <b>First Name:</b> {user.firstName}
                            </Text>
                            <Text pt='2' fontSize='sm'>
                                <b>Last Name:</b> {user.lastName}
                            </Text>
                        </Box>
                        
                    </Stack>
                </CardBody>
            </Card>
        </Box>
    )
}

export default AccountDetails
