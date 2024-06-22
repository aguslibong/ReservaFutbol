import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from 'react';
import { NavLink } from 'react-router-dom';

function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to="/inicio">Canchas Loya</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/reserva" className="nav-link">Reservas</Nav.Link>
            <Nav.Link as={NavLink} to="/cancha" className="nav-link">Canchas</Nav.Link>
            <Nav.Link as={NavLink} to="/cliente" className="nav-link">Clientes</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/login" className="nav-link">Iniciar sesión</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
