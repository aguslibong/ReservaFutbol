import { useEffect, useState } from "react";

export function ReservaListado({ rows, onModificarReserva, onEliminarReserva, canchas, clientes, tipoReservas }) {
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
    }

    const onClickEliminar = (reserva) => {
        onEliminarReserva(reserva);
    }

    if (!rows || rows.length === 0) {
        return (
            <div className="container mt-5">
                <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                    <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
                </div>
                <table className="table table-bordered">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Fecha Reserva</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Cancha</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Tipo Reserva</th>
                            <th scope="col">Comprobante</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
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

    return (
        <div className="container mt-5">
            <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
            </div>
            <div className="table-container">
                <table className="table table-bordered">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Fecha Reserva</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Cancha</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Tipo Reserva</th>
                            <th scope="col">Comprobante</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tbody}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
