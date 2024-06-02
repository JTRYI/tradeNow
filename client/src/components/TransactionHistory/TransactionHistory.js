import React, { useState, useEffect } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  Heading,
  Spinner,
  Center

} from '@chakra-ui/react'
import { FaSackDollar } from "react-icons/fa6";
import './TransactionHistory.css'

const IndTransaction = (props) => {

  const indTransaction = props.indTransaction;
  const amount = indTransaction.amount / 100;

  return (
    <Tr>
      <Td color='#f4f4f4'>
        {indTransaction.id}
      </Td>
      <Td color='#f4f4f4'>
        {indTransaction.transaction_type_details.recipient}
      </Td>
      <Td color='#f4f4f4'>
        {indTransaction.transaction_type_details.remote_subject}
      </Td>
      <Td color='#f4f4f4'>
        $ {amount}
      </Td>
      <Td color='#f4f4f4'>
        {indTransaction.created_at}
      </Td>
    </Tr>
  )
}

const TransactionHistory = (props) => {

  const [isLoading, setIsLoading] = useState(true);
  const transHistory = props.transactionHistory;
  console.log("Trans History", transHistory);

  useEffect(() => {
    if (transHistory.length > 0) {
      setIsLoading(false);
    }
  }, [transHistory]);


  // This method will map out the transaction history on the table
  function transactionHistoryList() {

    return transHistory.map((InvTransaction) => (
      <IndTransaction indTransaction={InvTransaction} />
    ));
  }

  return (
    <Box className='transaction-history-container'>
      <Box display='flex' alignItems='center'>
        <Heading size='md' color='#f4f4f4' padding='15px'>Transaction History</Heading>
        <FaSackDollar style={{ color: 'gold', transform: 'translateY(-4px)', fontSize: '20px' }} />
      </Box>
      <TableContainer maxHeight='300px'
        overflowY="auto">
        <Table variant='simple' size='sm'>
          <Thead className="sticky-header">
            <Tr>
              <Th style={{ color: '#f4f4f4' }}>Transaction ID</Th>
              <Th style={{ color: '#f4f4f4' }}>Recipient Email</Th>
              <Th style={{ color: '#f4f4f4' }}>Subject</Th>
              <Th style={{ color: '#f4f4f4' }}>Amount (SGD)</Th>
              <Th style={{ color: '#f4f4f4' }}>Transfer Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading ? (
              <Td colSpan="5">
                <Center py={6}>
                  <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='#b386f1'
                    size='xl'
                  />
                </Center>
              </Td>
            ) : (
              transactionHistoryList()
            )}
          </Tbody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default TransactionHistory;
