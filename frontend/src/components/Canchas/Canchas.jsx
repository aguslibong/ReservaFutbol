import React, { useState, useEffect } from 'react';
import ConsultaCanchas from './Components-Canchas/ConsultaCanchas.jsx';
import RegistroCanchas from './Components-Canchas/RegistroCanchas.jsx';
import service from '../../services/Canchas/canchas.service.js'
import serviceTipoCancha from '../../services/Canchas/tipoCanchas.service.js'
import './Cancha.css'


export default function Canchas() {
    const [action, setAction] = useState('C');
    const [rows, setRows] = useState([]);
    const [selectedCanchas, setSelectedCanchas] = useState(null);
    const [arrayTipoCancha, setArrayTipoCancha] = useState(null)

    useEffect(() => {
        loadData();
        getTipoCancha()
    }, []);
    
    const loadData = async (id) => {
        if (id) {
            const data = await service.getCanchas(id);
            setRows(data);
        }
        else {
            const data = await service.getCanchas(null);
            setRows(data);
            console.log(data)
        }
        
    };

    const getTipoCancha = async () =>{
        const data = await serviceTipoCancha.getTipocanchas()
        setArrayTipoCancha (data)
    }

    const onRegistrar = () => {
        setSelectedCanchas (null)
        setAction('R'); 
    };

    const onModificar = (cancha) => {
        console.log(cancha)
        setSelectedCanchas (cancha)
        setAction('M')
    }

    const onDelete = async(id) => {
        await service.deleteCanchas(id);
        loadData()
    }

    const onBuscar = async(id) => {
        loadData(id)
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
                        <ConsultaCanchas rows={rows} onRegistrar={onRegistrar} onModificar={onModificar} onDelete={onDelete} buscarId={onBuscar} tipoCancha={arrayTipoCancha}/>
                    </>
                    
                )
            }
        </div>
    )
}