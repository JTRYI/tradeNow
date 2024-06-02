import React from 'react';
import './MyNavbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';

function MyNavbar() {

  const navigate = useNavigate();
  return (
    <Navbar style={{ backgroundColor: "#26272b" }}>
      <Container>
        <Navbar.Brand onClick={() => {
          navigate('/dashboard')
        }} style={{ cursor: 'pointer' }}>
          <img
            src="/img/tradeNow.png"
            width="80"
            height="80"
            className="d-inline-block align-top"
            alt=''
          />
        </Navbar.Brand>
        <Nav>

          <Nav.Item style={{ padding: '0px 15px' }} onClick={() => {
            navigate('/currencies')
          }}>
            <Nav.Link style={{ color: '#b386f1' }}><b>Cryptocurrencies</b></Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ padding: '0px 15px' }}>
            <Nav.Link href="#" style={{ color: '#b386f1' }}><b>News</b></Nav.Link>
          </Nav.Item>
          <Nav.Item style={{ padding: '0px 15px' }} onClick={() => {
            navigate('/portfolio')
          }}>
            <Nav.Link href="#" style={{ color: '#b386f1' }}>
              <b>Portfolio</b>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>


    </Navbar>
  );
}

export default MyNavbar;
