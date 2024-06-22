export function ReservaListado({ rows, searchForm, onModificarReserva, onEliminarReserva }) {

    const onClickModificar = (reserva) => {
        onModificarReserva(reserva);
    }
    
    const onClickEliminar = (reserva) => {
        onEliminarEmpleado(reserva)
    }

    if (!rows || rows.length === 0) {
        return (
            <div className="container mt-5">
                <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                    <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
                    {searchForm}
                </div>
                <table className="table table-bordered">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Fecha Reserva</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Id Cancha</th>
                            <th scope="col">Id Cliente</th>
                            <th scope="col">Id Tipo Reserva</th>
                            <th scope="col">Comprobante</th>
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
            <td>{reserva.idCancha}</td>
            <td>{reserva.idCliente}</td>
            <td>{reserva.idTipoReserva}</td>
            <td>{reserva.comprobante}</td>
        </tr>
    ));

    return (
        <div className="container mt-5">
            <div className="header-container p-3 mb-2 bg-primary text-white rounded d-flex justify-content-between align-items-center">
                <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>RESERVAS</h2>
                {searchForm}
            </div>
            <div className="table-container">
                <table className="table table-bordered">
                    <thead className="bg-light">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Fecha Reserva</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Id Cancha</th>
                            <th scope="col">Id Cliente</th>
                            <th scope="col">Id Tipo Reserva</th>
                            <th scope="col">Comprobante</th>
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
