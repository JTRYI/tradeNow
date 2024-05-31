import React from 'react'
import './BuySummary.css'
import { useState } from 'react';
import {
    FormControl, FormLabel, Input, Tag, TagLabel, Spinner, NumberDecrementStepper, NumberIncrementStepper, NumberInput,
    NumberInputField, NumberInputStepper, VStack, HStack, Button, useToast, useDisclosure
} from '@chakra-ui/react'
import axios from 'axios';
import BuyResult from '../BuyResult/BuyResult';

const BuySummary = ({ cryptoPrice, cryptoTicker }) => {
    // Check if cryptoPrice exists and contains USD and SGD properties
    const hasPriceData = cryptoPrice && cryptoPrice.USD !== undefined && cryptoPrice.SGD !== undefined;

    const user = JSON.parse(sessionStorage.getItem('user'));

    const [form, setForm] = useState({
        fidorID: user.id,
        recEmail: "",
        transAmount: "",
        transReference: "",
        transRemarks: cryptoTicker
    });

    //These methoods will update the state properties
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    const [amount, setAmount] = useState(0);
    const [quantity, setQuantity] = useState(""); // State for quantity
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [transDetails, setTransDetails] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal state management

    //These methoods will update the state amount
    function updateAmount(value) {
        setQuantity(value);
        const calculatedAmount = value * cryptoPrice.SGD;
        setAmount(calculatedAmount);
        updateForm({ transAmount: calculatedAmount });
    }

    const toast = useToast();
    const token = sessionStorage.getItem('token');

    //This function will handle the submission
    async function onSubmit(e) {
        e.preventDefault();

        // Check for individual fields missing
        if (form.transAmount === 0) {
            toast({
                title: 'Request Unsuccessful',
                description: "Select a Quantity!",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        } else if (form.transAmount >= 10000) {
            toast({
                title: 'Request Unsuccessful',
                description: "Amount cannot exceed $10000!",
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
            return;
        }

        console.log("Form state before", form);

        setIsLoading(true); // Start loading

        try {
            const response = await axios.post('http://localhost:5000/process', {
                customerEmailAdd: form.recEmail,
                transferAmount: form.transAmount,
                transferRemarks: form.transRemarks,
                transactionID: form.transReference,
                fidorID: form.fidorID
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const transaction_details = response.data;
            // console.log("Transaction details", transaction_details);

            if (transaction_details.message === "An order with this external_uid has already been placed") {
                toast({
                    title: 'Transaction Failed',
                    description: "Duplicate Transaction Reference.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } else {

                toast({
                    title: 'Transaction Successful',
                    description: "The transfer was processed successfully!",
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });

                setTransDetails(transaction_details);
                onOpen(); // Open the modal

                setForm({ fidorID: user.id, recEmail: "", transAmount: "", transReference: "", transRemarks: cryptoTicker });
                setAmount(0);
                setQuantity(""); // Reset quantity to blank
            }

        } catch (error) {
            console.error(error);

            toast({
                title: 'Transaction Failed',
                description: "There was an issue processing the transaction.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false); // Stop loading
        }
    }

    // Callback function to handle closing the modal and clearing the transaction details
    const handleClose = () => {
        onClose(); // Close the modal
        setTransDetails(null); // Clear the transaction details
    };

    return (
        <div className='summary-box'>

            <p>Account No: {user.accountNo}</p>
            <p>My Balance: ${user.balance}</p>

            {hasPriceData ? (
                <>

                    <h6>
                        {cryptoTicker} <Tag size='sm' colorScheme='red'>
                            <TagLabel>USD</TagLabel>
                        </Tag>  ${cryptoPrice.USD}
                    </h6>
                    <h6>
                        {cryptoTicker} <Tag size='sm' colorScheme='green'>
                            <TagLabel>SGD</TagLabel>
                        </Tag> ${cryptoPrice.SGD}
                    </h6>

                </>
            ) : (
                <Spinner thickness='2px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#b386f1' />
            )}

            <form style={{ paddingTop: '10px' }} onSubmit={onSubmit}>
                <VStack>
                    <FormControl>
                        <FormLabel>Fidor ID</FormLabel>
                        <Input isDisabled value={form.fidorID} />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Recipient Email</FormLabel>
                        <Input isRequired value={form.recEmail} onChange={(e) => {
                            updateForm({ recEmail: e.target.value })
                        }} />
                    </FormControl>
                    <HStack>
                        <FormControl>
                            <FormLabel>Quantity</FormLabel>
                            <NumberInput isRequired min={0} value={quantity} onChange={updateAmount}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper style={{ color: '#b386f1' }} />
                                    <NumberDecrementStepper style={{ color: '#b386f1' }} />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Transfer Amount (SGD)</FormLabel>
                            <Input isDisabled value={amount} />
                        </FormControl>
                    </HStack>

                    <FormControl>
                        <FormLabel>Transaction Reference</FormLabel>
                        <Input isRequired value={form.transReference} onChange={(e) => {
                            updateForm({ transReference: e.target.value })
                        }} />
                    </FormControl>

                    <Button type='submit' colorScheme='green' variant='outline' size='md' border='2px'
                        borderColor='green.500' width='150px' marginTop='10px' isLoading={isLoading} // Show spinner when loading
                        loadingText='Processing' spinnerPlacement='end'
                    >
                        BUY
                    </Button>

                </VStack>
            </form>
            {transDetails && (
                <BuyResult
                    transDetails={transDetails}
                    isOpen={isOpen}
                    onClose={handleClose} // Pass the handleClose function
                />
            )}

        </div>
    );
};

export default BuySummary;