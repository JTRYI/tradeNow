import React from 'react'
import './BuyResult.css'
import { Heading, Stack, StackDivider, Box, Text } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'

const BuyResult = (props) => {

    const transDetails = props.transDetails;
    console.log("Trans Details", transDetails);

    const transAmount = parseFloat(transDetails.amount / 100);

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent backgroundColor='#f4f4f4'>
                    <ModalHeader color='#b386f1'>Transaction Result</ModalHeader>
                    <ModalCloseButton onClick={props.onClose} />
                    <ModalBody>
                        <Stack divider={<StackDivider />} spacing='4'>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Transaction ID
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {transDetails.id}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Overview
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    SGD ${transAmount} was transferred to {transDetails.recipient_name}.
                                </Text>
                                <Text fontSize='sm'>
                                    Recipient Email: {transDetails.receiver}
                                </Text>
                            </Box>
                            <Box>
                                <Heading size='xs' textTransform='uppercase'>
                                    Cryptocurrency
                                </Heading>
                                <Text pt='2' fontSize='sm'>
                                    {transDetails.subject}
                                </Text>
                            </Box>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button  onClick={props.onClose} backgroundColor='#b386f1;'
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

export default BuyResult
