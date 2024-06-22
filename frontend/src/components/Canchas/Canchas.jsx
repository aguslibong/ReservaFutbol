import React, { useState, useEffect } from 'react';
import ConsultaCanchas from './Components-Canchas/ConsultaCanchas.jsx';
import RegistroCanchas from './Components-Canchas/RegistroCanchas.jsx';
import service from '../../services/Canchas/canchas.service.js'
import './Cancha.css'


export default function Canchas() {
    const [action, setAction] = useState('C');
    const [rows, setRows] = useState([]);
    const [selectedCanchas, setSelectedCanchas] = useState(null);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async () => {
        const data = await service.getCanchas();
        setRows(data);
    };

    const onRegistrar = () => {
        setSelectedCanchas (null)
        setAction('R'); 
    };

    const onModificar = (cancha) => {
        console.log(cancha)
        setSelectedCanchas (cancha)
        setAction('M')
    }

    const onDelete = async(cancha) => {
        await service.deleteCanchas(cancha);
        loadData()
    }

    return (
        <div>
            {
                (action === 'R' || action === 'M')  && (
                    <RegistroCanchas setAction={setAction} loadData={loadData} cancha={selectedCanchas} />
                )
            }
            {
                action === 'C' && (
                    <>
                        <ConsultaCanchas rows={rows} onRegistrar={onRegistrar} onModificar={onModificar} onDelete={onDelete} />
                    </>
                    
                )
            }
        </div>
    )
}