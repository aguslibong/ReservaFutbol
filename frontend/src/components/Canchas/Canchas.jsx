import React, { useState, useEffect } from 'react';
import ConsultaCanchas from './Components-Canchas/ConsultaCanchas.jsx';
import RegistroCanchas from './Components-Canchas/RegistroCanchas.jsx';
import service from '../../services/Canchas/chanchas.service.js'
import { Link }  from 'react-router-dom';
//import './Canchas.css'


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

    const onModificar = (canchas) => {
        setSelectedCanchas (canchas)
        setAction('M')
    }

    const onDelete = async(canchas) => {
        await service.deleteCanchas(canchas);
        loadData()
    }

    return (
        <div>
            {
                (action === 'R' || action === 'M')  && (
                    <RegistroCanchas setAction={setAction} loadData={loadData} canchas={selectedCanchas} />
                )
            }
            {
                action === 'C' && (
                    <>
                        <ConsultaCanchas rows={rows} onRegistrar={onRegistrar} onModificar={onModificar} onDelete={onDelete} />
                        <Link to="/inicio" className="btn btn-primary position-absolute bottom-0 start-0 m-3">Menu</Link>

                    </>
                    
                )
            }
        </div>
    )
}