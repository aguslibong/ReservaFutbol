import React from 'react';
import futbolLoyaImage from '../assets/FutbolLoya.jpeg';

export default function Inicio() {
    return (
        <>
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <h1>Bienvenidos a Canchas Loya</h1>
                <p>
                    En Canchas Loya, nos apasiona el fútbol. Ofrecemos las mejores instalaciones para que disfrutes del deporte rey con tus amigos y familiares. Nuestras canchas están equipadas con la mejor tecnología y mantenimiento, asegurando una experiencia de juego de alta calidad.
                </p>
                <img src={futbolLoyaImage} alt="Canchas de Fútbol Loya" style={{ width: '30%', height: 'auto', marginTop: '20px' }} />
            </div>
        </>
    );
}
