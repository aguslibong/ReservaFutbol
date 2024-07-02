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
    const [listaInactivos, setListaInactivos] = useState([]);
    const [listaActivos, setListaActivos] = useState([]);
    const [mostrandoActivos, setMostrandoActivos] = useState(true); // Nuevo estado para alternar entre listas

    useEffect(() => {
        loadData();
        getTipoCancha();
    }, []);

    const loadData = async (id = null) => {
        const data = await service.getCanchas(id);
        let activos = [];
        let inactivos = [];

        data.forEach(element => {
            element.activo ? activos.push(element) : inactivos.push(element);
        });

        setListaActivos(activos);
        setListaInactivos(inactivos);

        if (mostrandoActivos) {
            setRows(activos);
        } else {
            setRows(inactivos);
        }

        console.log('Activos:', activos);
        console.log('Inactivos:', inactivos);
    };

    const getTipoCancha = async () => {
        const data = await serviceTipoCancha.getTipocanchas();
        setArrayTipoCancha(data);
    };

    const onRegistrar = () => {
        setSelectedCanchas(null);
        setAction('R');
    };

    const onModificar = async (cancha, accion) => {
        console.log(cancha, accion);
        if (accion === 'M') {
            setSelectedCanchas(cancha);
            setAction(accion);
        } else {
            const Modificarbool = (canchabool) => {
                let newCanchabool = { ...canchabool };
                newCanchabool.activo = !newCanchabool.activo;
                return newCanchabool;
            };

            const updatedCancha = Modificarbool(cancha);
            await service.updateCanchas(updatedCancha);
            loadData();
        }
    };

    const onMostrar = () => {
        if (mostrandoActivos) {
            setRows(listaInactivos);
        } else {
            setRows(listaActivos);
        }
        setMostrandoActivos(!mostrandoActivos); // Alterna el estado
    };

    const onDelete = async (id) => {
        await service.deleteCanchas(id);
        loadData();
    };

    const onBuscar = async (id) => {
        loadData(id);
    };

    return (
        <div>
            {
                (action === 'R' || action === 'M') && (
                    <RegistroCanchas setAction={setAction} loadData={loadData} cancha={selectedCanchas} />
                )
            }
            {
                action === 'C' && (
                    <>
                        <ConsultaCanchas rows={rows} onRegistrar={onRegistrar} onModificar={onModificar} onDelete={onDelete} buscarId={onBuscar} tipoCancha={arrayTipoCancha} onMostrar={onMostrar} mostrandoActivos={mostrandoActivos} />
                    </>
                )
            }
        </div>
    );
}
