import React from "react";
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';

export function ReservaListado({ rows, onModificarReserva, onEliminarReserva, canchas, clientes, tipoReservas, totalPages, currentPage, handlePageChange, searchForm, showAlert, setShowAlert }) {
    const getNombreCancha = (idCancha) => {
        const cancha = canchas.find(cancha => cancha.idCancha === idCancha);
        return cancha ? cancha.descripcion : '';
    };

    const getNombreCliente = (idCliente) => {
        const cliente = clientes.find(cliente => cliente.idCliente === idCliente);
        return cliente ? cliente.nombre : '';
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

    if (!rows || rows.length === 0) {
        return (
            <div className="container mt-5">
                <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                    <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
                    {searchForm}
                </div>
                {showAlert && (
                  <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    No se encontró una reserva con el ID proporcionado.
                  </Alert>
                )}
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha Reserva</th>
                            <th>Hora</th>
                            <th>Cancha</th>
                            <th>Cliente</th>
                            <th>Tipo Reserva</th>
                            <th>Comprobante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </Table>
            </div>
        );
    }

    const tbody = rows.map((reserva) => (
        <tr key={reserva.idReserva}>
            <td>{reserva.idReserva}</td>
            <td>{reserva.fechaReserva}</td>
            <td>{reserva.hora}</td>
            <td>{getNombreCancha(reserva.idCancha)}</td>
            <td>{getNombreCliente(reserva.idCliente)}</td>
            <td>{getDescripcionTipoReserva(reserva.idTipoReserva)}</td>
            <td>{reserva.comprobante}</td>
            <td>
                <button onClick={() => onClickModificar(reserva)} className="btn btn-warning me-2">Modificar</button>
                <button onClick={() => onClickEliminar(reserva)} className="btn btn-danger">Eliminar</button>
            </td>
        </tr>
    ));

    const renderPageNumbers = () => {
        let items = [];
        for (let number = 1; number <= totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
                    {number}
                </Pagination.Item>,
            );
        }
        return items;
    };

    return (
        <div className="container mt-5">
            <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                <h2 className="mb-0" style={{ fontFamily: 'monospace', marginRight: 20 }}>RESERVAS</h2>
                {searchForm}
            </div>
            {showAlert && (
              <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                No se encontró una reserva con el ID proporcionado.
              </Alert>
            )}
            <div className="table-container">
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Fecha Reserva</th>
                            <th>Hora</th>
                            <th>Cancha</th>
                            <th>Cliente</th>
                            <th>Tipo Reserva</th>
                            <th>Comprobante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </Table>
                <div className="pagination">
                    <Pagination>{renderPageNumbers()}</Pagination>
                </div>
            </div>
        </div>
    );
}
