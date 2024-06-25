import React, { useState, useEffect } from 'react';
import TipoReservaListado from './ComponentesHijos/TipoReservaListado';
import TipoReservaRegistro from './ComponentesHijos/TipoReservaRegistro';
import tipoReservasService from '../../services/reservas/tipoReservas.service';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import './Reservas.css';

export default function TipoReservas() {
    const [action, setAction] = useState('C');
    const [rows, setRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [selectedTipoReserva, setSelectedTipoReserva] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

    const { handleSubmit, register } = useForm();

    const onSubmit = handleSubmit(async (data) => {
        if (!data.idTipoReserva) {
            setShowAlert(false);
            setCurrentPage(1);
            return loadData();
        }
        const tipoReservaFiltrada = (await tipoReservasService.getTipoReservas()).find((tipoReserva) => tipoReserva.idTipoReserva === parseInt(data.idTipoReserva));
        const filteredData = tipoReservaFiltrada ? [tipoReservaFiltrada] : [];

        if (filteredData.length === 0) {
            setShowAlert(true);
            return loadData();
        } else {
            setCurrentPage(1);
            setRows(filteredData);
            setShowAlert(false);
        }
    });

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const data = await tipoReservasService.getTipoReservas();
        setRows(Array.isArray(data) ? data : []);
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = rows.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(rows.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const searchForm = (
        <form onSubmit={onSubmit} className="d-flex">
            <input
                type="text"
                {...register("idTipoReserva")}
                className="form-control"
                placeholder="Buscar por id de tipo reserva"
                aria-label="Example text with button addon"
                aria-describedby="button-addon1"
            />
            <button className="btn btn-filtrar" type="submit" id="button-addon1" style={{ background: 'lightgreen', marginLeft: 20 }}>
                Buscar
            </button>
        </form>
    );

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
                        rows={currentItems}
                        onModificar={onModificarTipoReserva}
                        onEliminar={onEliminarTipoReserva}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                        searchForm={searchForm}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                    />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <button type="button" style={{ width: 150, background: "green" }} className="btn btn-secondary" onClick={onAgregarTipoReserva}>
                            Agregar Tipo Reserva
                        </button>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
                        <Link to="/inicio" className="btn btn-primary m-3">Menu</Link>
                        <Link to="/reserva" className="btn btn-primary m-3">Volver</Link>
                    </div>
                </>
            )}
        </>
    );
}
