import React from 'react';
import './MyNavbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function MyNavbar() {
  return (
    <Navbar style={{ backgroundColor: "#3D5AFE" }}>
      <Container>
        <Navbar.Brand href="#">
          <img
            src="/img/tradeNow_logo-removebg.png"
            width="70"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Nav>

          <Nav.Item style={{ padding: '0px 15px' }}>
            <Nav.Link href="#" style={{ color: 'black' }}>Buy Cryptocurrencies</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ padding: '0px 15px' }}>
            <Nav.Link href="#" style={{ color: 'black' }}>News</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ padding: '0px 15px' }}>
            <Nav.Link href="#" style={{ color: 'black' }}>Chatbot</Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ padding: '0px 15px' }}>
            <Nav.Link href="#" style={{ color: 'black' }}>
              Dashboard
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>


    </Navbar>
  );
}

export default MyNavbar;
