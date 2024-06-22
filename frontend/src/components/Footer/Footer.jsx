// Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4} className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3274.466745539213!2d-57.96149722404073!3d-34.92146937304942!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e8a42a403b2d%3A0x5d42cbbf3e1c2822!2sGimnasia%20y%20Esgrima%20La%20Plata!5e0!3m2!1sen!2sar!4v1622572035000!5m2!1sen!2sar"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </Col>
          <Col md={4} className="footer-title">
            <h2>CanchasLoya</h2>
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
