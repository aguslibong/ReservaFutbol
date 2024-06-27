import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import futbolLoyaImage from '../../assets/FutbolLoya.jpeg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="justify-content-start">
          <Col md={4} className="footer-map ">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1641.9894141178325!2d-64.2470682149568!3d-31.36895710366611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943298b644e8c3f7%3A0xecd158014bddbc14!2sEstadio%20Mario%20Alberto%20Kempes!5e0!3m2!1sen!2sar!4v1688913120743!5m2!1sen!2sar"
             width="100%"
             height="100%"
             style={{ border: 0 }}
             allowFullScreen=""
             loading="lazy"
             title="Google Maps" 
             allowfullscreen="" 
             referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Col>
          <Col md={4} className="footer-title">
            <div className="contact-info">
              <p>Teléfono: +1 (234) 567-8901</p>
              <p>Email: canchasLoya@gmail.com</p>
              <p>Dirección: Ramón Cárcano, Córdoba, Argentina</p>
              <p className='pCopy'>&copy; 2024 - 2025 Canchas Loya. Todos los derechos reservados.</p>
            </div>
          </Col>
          <Col md={4} className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
