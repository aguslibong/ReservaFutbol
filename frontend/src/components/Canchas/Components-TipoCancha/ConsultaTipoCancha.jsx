import React from 'react';
import { Link }  from 'react-router-dom';

const ConsultaTipoCancha = ({ rows, onRegistrar, onModificar, onDelete }) => {

    const onClickDelete = async (cancha) => {
        onDelete(cancha)
    }

    const onClickUpdate = async (cancha) => {
        onModificar(cancha)
    }

    const tbody = rows.map(e =>
        <tr key={e.idTipoCancha}>
            <td>{e.idTipoCancha}</td>
            <td>{e.descripcion}</td>
            <td>
                <button type="button" className="btn btn-secondary me-3" onClick={() => onClickUpdate(e)}>Modificar</button>
                <button type="button" className="btn btn-danger me-3" onClick={() => onClickDelete(e)}>Eliminar</button>
            </td>
        </tr>
    )

    return (
        <div className="container mt-5">
            <div className="p-3 mb-2 bg-primary text-white rounded">
                <h2 className="mb-0" style={{ fontFamily: 'monospace' }}>GESTION TIPOCANCHA</h2>
            </div>
            <table className="table table-bordered">
                <thead className="bg-light">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Opciones</th>
                    </tr>
                </thead>
                <tbody>
                    {tbody}
                </tbody>
            </table>
            <button className="btn btn-secondary mt-3" onClick={onRegistrar}>Registrar TipoCancha</button> 
            <div>
                <Link to="/inicio" className="btn btn-primary m-3">Menu</Link>
                <Link to="/cancha" className="btn btn-primary m-3">Gestionar Cancha</Link>
            </div>
        </div>
        
    );
};

export default ConsultaTipoCancha;