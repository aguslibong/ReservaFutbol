import React from 'react';
import Card from 'react-bootstrap/Card';
import futbolLoyaImage from '../assets/FutbolLoya.jpeg';

export default function Inicio() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Card style={{ width: '30rem', textAlign: 'center' }}>
        <Card.Img variant="top" src={futbolLoyaImage} alt="Canchas de Fútbol Loya" />
        <Card.Body>
          <Card.Title>Bienvenidos a Canchas Loya</Card.Title>
          <Card.Text>
            En Canchas Loya, nos apasiona el fútbol. Ofrecemos las mejores instalaciones para que disfrutes del deporte rey con tus amigos y familiares. Nuestras canchas están equipadas con la mejor tecnología y mantenimiento, asegurando una experiencia de juego de alta calidad.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}


