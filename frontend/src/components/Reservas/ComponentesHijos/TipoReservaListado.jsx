export default function TipoReservaListado({ rows, onAgregar, onModificar, onEliminar }) {
    
    return (
        <div className="container">
            <h1>Tipos de Reserva</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.idTipoReserva}>
                            <td>{row.idTipoReserva}</td>
                            <td>{row.descripcion}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => onModificar(row)}>Modificar</button>
                                <button className="btn btn-danger" onClick={() => onEliminar(row)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" style={{background: "green"}} onClick={onAgregar}>Agregar</button>
        </div>
    );
}