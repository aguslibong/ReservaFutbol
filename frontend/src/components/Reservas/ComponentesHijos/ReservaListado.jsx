import React from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';
import reservasService from "../../../services/reservas/reservas.service.js"; // Asegúrate de que la ruta sea correcta

export function ReservaListado({ rows, onModificarReserva, onEliminarReserva, onToggleActivoReserva, canchas, clientes, tipoReservas, totalPages, currentPage, handlePageChange, searchForm, onAgregarReserva, showAlert, setShowAlert }) {
   
    const getNombreCancha = (idCancha) => {
        const cancha = canchas.find(cancha => cancha.idCancha === idCancha);
        return cancha ? cancha.descripcion : '';
    };

    const getDocCliente = (idCliente) => {
        const cliente = clientes.find(cliente => cliente.idCliente === idCliente);
        return cliente ? cliente.nroDoc : '';
    };

    const getDescripcionTipoReserva = (idTipoReserva) => {
        const tipoReserva = tipoReservas.find(tipoReserva => tipoReserva.idTipoReserva === idTipoReserva);
        return tipoReserva ? tipoReserva.descripcion : '';
    };

    const onClickModificar = (reserva) => {
        onModificarReserva(reserva);
    };

    const onClickEliminar = (reserva) => {
        onEliminarReserva(reserva);
    };

    const onClickToggleActivo = (reserva) => {
        onToggleActivoReserva(reserva);
    };

    if (!rows || rows.length === 0) {
        return (
            <div className="container mt-5">
                <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                    <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
                    {searchForm}
                    <button type="button" style={{ width: 150, background: "green", marginLeft: 50 }} className="btn btn-secondary" onClick={onAgregarReserva}>
                        Agregar Reserva
                    </button>
                </div>
                {showAlert && (
                    <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                        No se encontró una reserva con la Fecha proporcionada.
                    </Alert>
                )}
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Fecha Reserva</th>
                            <th>Hora</th>
                            <th>Cancha</th>
                            <th>Documento Cliente</th>
                            <th>Tipo Reserva</th>
                            <th>Observación</th>
                            <th>Activo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </div>
        );
    }

    const sortedRows = rows.sort((a, b) => new Date(a.fechaReserva) - new Date(b.fechaReserva));

    const tbody = sortedRows.map((reserva) => (
        <tr key={reserva.idReserva}>
            <td>{reserva.fechaReserva}</td>
            <td>{reserva.hora}</td>
            <td>{getNombreCancha(reserva.idCancha)}</td>
            <td>{getDocCliente(reserva.idCliente)}</td>
            <td>{getDescripcionTipoReserva(reserva.idTipoReserva)}</td>
            <td>{reserva.comprobante}</td>
            <td>{reserva.activo ? 'Sí' : 'No'}</td>
            <td>
                <button onClick={() => onClickModificar(reserva)} className="btn btn-primary"><i className="bi bi-archive"></i></button>
                <button onClick={() => onClickEliminar(reserva)} className="btn btn-danger"><i className="bi bi-trash3"></i></button>
                <button onClick={() => onClickToggleActivo(reserva)} className="btn btn-warning"> {reserva.activo ? <i className="bi bi-ban"></i> : <i className="bi bi-check-lg"></i>}</button>
            </td>
        </tr>
    ));

    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
        paginationItems.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                {number}
            </Pagination.Item>
        );
    }

    return (
        <div className="container mt-5">
            <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
                {searchForm}
                <button type="button" style={{ width: 150, background: "green", marginLeft: 50 }} className="btn btn-secondary" onClick={onAgregarReserva}>
                    Agregar Reserva
                </button>

            </div>
            {showAlert && (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    No se encontró una reserva con la observación proporcionada.
                </Alert>
            )}
            <Table responsive>
                <thead>
                    <tr>
                        <th>Fecha Reserva</th>
                        <th>Hora</th>
                        <th>Cancha</th>
                        <th>Documento Cliente</th>
                        <th>Tipo Reserva</th>
                        <th>Observación</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </Table>
            <Pagination>{paginationItems}</Pagination>
        </div>
    );
}
