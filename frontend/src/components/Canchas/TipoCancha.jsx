import React, { useState, useEffect } from 'react';
import ConsultaTipoCancha from './Components-TipoCancha/ConsultaTipoCancha.jsx';
import RegistroTipoCancha from './Components-TipoCancha/RegistroTipoCancha.jsx';
import service from '../../services/Canchas/tipoCanchas.service.js'
import './Cancha.css'


export default function TipoCancha() {
    const [action, setAction] = useState('C');
    const [rows, setRows] = useState([]);
    const [selectedTipoCancha, setSelectedTipoCancha] = useState(null);

    useEffect(() => {
        loadData();
    }, []);
    
    const loadData = async (id) => {
        if (id) {
            const data = await service.getTipocanchas(id);
            setRows(data);
        }
        else {
            const data = await service.getTipocanchas(null);
            setRows(data);
        }
        
    };

    const onRegistrar = () => {
        setSelectedTipoCancha (null)
        setAction('R'); 
    };

    const onModificar = (cancha) => {
        console.log(cancha)
        setSelectedTipoCancha (cancha)
        setAction('M')
    }

    const onDelete = async(id) => {
        await service.deleteTipocanchas(id);
        loadData()
    }

    const onBuscar = async(id) => {
        loadData(id)
    }

    return (
        <div>
            {
                (action === 'R' || action === 'M')  && (
                    <RegistroTipoCancha setAction={setAction} loadData={loadData} cancha={selectedTipoCancha} />
                )
            }
            {
                action === 'C' && (
                    <>
                        <ConsultaTipoCancha rows={rows} onRegistrar={onRegistrar} onModificar={onModificar} onDelete={onDelete} buscarId={onBuscar} />
                    </>
                    
                )
            }
        </div>
    )
}

