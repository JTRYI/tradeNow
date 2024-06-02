import React from 'react'
import './QueryResult.css'
import {
    Modal, Heading, Button, ModalFooter, Box, ModalHeader, ModalBody, ModalCloseButton, Stack,
    StackDivider, ModalContent, ModalOverlay, Avatar
} from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import Coin from '../../screens/Coin/Coin';



const IndResult = (props) => {

    const invResult = props.invResult;

    return (
        <Link to= {`/coin/${invResult.id}`} element={<Coin/>} key={invResult.id}>
            <Box className='ind-result' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Box style={{display: 'flex', alignItems: 'center'}}>
                    <Avatar size='sm' src={invResult.large} />
                    <Heading size='xs' textTransform='uppercase' style={{paddingLeft: '10px'}}>
                        {invResult.symbol}
                    </Heading>
                </Box>
                <Heading size='sm' style={{paddingTop: '10px'}}>{invResult.name}</Heading>
            </Box>
        </Link>
    )
}

const QueryResult = (props) => {

    const results = props.result;
    //Get top 3 results
    const topResults = results.slice(0, 3);
    // console.log("Search Result", topResults);

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent backgroundColor='#f4f4f4'>
                    <ModalHeader color='#b386f1' textAlign='center' fontSize='28px'>Search Results</ModalHeader>
                    <ModalCloseButton onClick={props.onClose} />
                    <ModalBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            {topResults.map((invResult) => (
                                <IndResult key={invResult.id} invResult={invResult} />
                            ))}
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={props.onClose} backgroundColor='#b386f1;'
                            color='black' borderRadius={8}
                            borderColor='#b386f1'
                            _hover={
                                {
                                    color: '#f4f4f4',
                                    backgroundColor: '#b386f1'
                                }
                            }>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default QueryResult
