import React from 'react';


const ConsultaCanchas = ({ rows, onRegistrar, onModificar, onDelete }) => {

    const onClickDelete = async (cancha) => {
        onDelete(cancha)
    }

    const onClickUpdate = async (cancha) => {
        onModificar(cancha)
    }

    const tbody = rows.map(e =>
        <tr key={e.idCancha}>
            <td>{e.idCancha}</td>
            <td>{e.fechaMantenimiento}</td>
            <td>{e.idTipoCancha}</td>
            <td>{e.descripcion}</td>
            <td>{e.foto}</td>
            <td>
                <button type="button" className="btn btn-secondary me-3" onClick={() => onClickUpdate(e)}>Modificar</button>
                <button type="button" className="btn btn-danger me-3" onClick={() => onClickDelete(e)}>Eliminar</button>
            </td>
        </tr>
    )


    return (
        <div className="container mt-5">
            <div className="p-3 mb-2 bg-primary text-white rounded">
                <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>CANCHAS</h2>
            </div>
            <table className="table table-bordered">
                <thead className="bg-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Fecha Mantenimiento</th>
                        <th scope="col">Tipo Cancha</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Foto</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>

            <button className="btn btn-secondary mt-3" onClick={onRegistrar}>Regitrar Cancha</button>

        </div>

    );
};

export default ConsultaCanchas;