import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import futbolLoyaImage from '../assets/FutbolLoya.jpeg';
import './Menu.css'; // Importa el archivo CSS

function Menu() {
  return (
    <Navbar collapseOnSelect expand="lg" className="custom-navbar"> {/* Usa la clase personalizada */}
      <Container>
        <div className="navbar-brand-container">
          <img src={futbolLoyaImage} alt="Canchas de Fútbol Loya" className="navbar-brand-image" />
          <Navbar.Brand as={NavLink} to="/inicio">Canchas Loya</Navbar.Brand>
        </div>
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
