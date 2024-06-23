import React, { useState, useEffect } from 'react';
import TipoReservaListado from './ComponentesHijos/TipoReservaListado';
import TipoReservaRegistro from './ComponentesHijos/TipoReservaRegistro';
import tipoReservasService from '../../services/reservas/tipoReservas.service';
import { Link } from 'react-router-dom';

export default function TipoReservas() {
    const [action, setAction] = useState('C');
    const [rows, setRows] = useState([]);
    const [selectedTipoReserva, setSelectedTipoReserva] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await tipoReservasService.getTipoReservas();
        setRows(data);
    };

    const onAgregarTipoReserva = () => {
        setSelectedTipoReserva(null);
        setAction('R');
    };

    const onModificarTipoReserva = (tipoReserva) => {
        setSelectedTipoReserva(tipoReserva);
        setAction('M');
    };

    const onEliminarTipoReserva = async (tipoReserva) => {
        await tipoReservasService.deleteTipoReservas(tipoReserva.idTipoReserva);
        loadData();
    };


    return (
        <>
            {(action === 'R' || action === 'M') && (
                <TipoReservaRegistro
                    setAction={setAction}
                    loadData={loadData}
                    tipoReserva={selectedTipoReserva}
                />
            )}
            {action === 'C' && (
                <>
                    <TipoReservaListado
                        rows={rows}
                        onAgregar={onAgregarTipoReserva}
                        onModificar={onModificarTipoReserva}
                        onEliminar={onEliminarTipoReserva}
                    />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <Link to="/inicio" className="btn btn-primary m-3">Menu</Link>
                        <Link to="/reserva" className="btn btn-primary m-3">Volver</Link>
                    </div>
                </>
            )}
        </>
    );
}